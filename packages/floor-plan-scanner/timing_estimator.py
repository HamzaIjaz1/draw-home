"""
Timing Estimation Module for Floor Plan Scanner

This module contains all timing prediction logic including:
- Hardware detection and performance tier classification
- Image-based complexity analysis for initial estimates
- MILP-specific timing prediction based on problem structure
- Calibrated models based on actual test data
"""

import cv2
import numpy as np
import time
import os


class HardwareDetector:
    """Detects hardware performance tier for timing calibration"""

    @staticmethod
    def detect_hardware_tier():
        """Detect hardware performance tier"""
        try:
            import psutil
            cpu_count = psutil.cpu_count(logical=True)
            memory_gb = psutil.virtual_memory().total / (1024**3)

            # Simple heuristic for hardware classification
            if cpu_count >= 8 and memory_gb >= 16:
                return 'fast'
            elif cpu_count >= 4 and memory_gb >= 8:
                return 'medium'
            else:
                return 'slow'
        except:
            return 'medium'  # Default fallback


class TimingPredictor:
    """Predicts processing time for each step based on input characteristics"""

    def __init__(self):
        # Base times for different hardware tiers (in seconds)
        self.base_times = {
            'startup': {'fast': 1.5, 'medium': 2.5, 'slow': 4.0},
            'ai_detection': {'fast': 1.8, 'medium': 3.2, 'slow': 5.5},
            'classification': {'fast': 2.0, 'medium': 3.5, 'slow': 6.0},
            'opening_matching': {'fast': 0.3, 'medium': 0.5, 'slow': 1.0}
        }

        # LP optimization scaling factors
        self.lp_base_time = {'fast': 0.5, 'medium': 1.2, 'slow': 3.0}
        self.lp_complexity_factor = {'fast': 0.001, 'medium': 0.003, 'slow': 0.008}

        self.hardware_tier = HardwareDetector.detect_hardware_tier()

    def predict_lp_time(self, image_path):
        """Predict LP optimization time based on image complexity"""
        try:
            # Quick image analysis for complexity estimation
            image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
            if image is None:
                return self.lp_base_time[self.hardware_tier]

            # Estimate complexity based on edge density
            edges = cv2.Canny(image, 50, 150)
            edge_density = np.sum(edges > 0) / (image.shape[0] * image.shape[1])

            # Estimate line count based on Hough transform
            lines = cv2.HoughLines(edges, 1, np.pi/180, threshold=50)
            line_count = len(lines) if lines is not None else 20

            # Complexity score (affects variable count in LP)
            complexity_score = min(line_count * edge_density * 1000, 500)

            # Calculate predicted time
            base_time = self.lp_base_time[self.hardware_tier]
            complexity_time = complexity_score * self.lp_complexity_factor[self.hardware_tier]
            predicted_time = base_time + complexity_time

            return max(0.5, min(predicted_time, 15.0))  # Clamp between 0.5-15 seconds

        except Exception as e:
            # Fallback to base time
            return self.lp_base_time[self.hardware_tier]

    def get_step_estimates(self, image_path):
        """Get time estimates for all processing steps"""
        lp_prediction = self.predict_lp_time(image_path)

        return {
            'startup': self.base_times['startup'][self.hardware_tier],
            'ai_detection': self.base_times['ai_detection'][self.hardware_tier],
            'lp_optimization': lp_prediction,
            'classification': self.base_times['classification'][self.hardware_tier],
            'opening_matching': self.base_times['opening_matching'][self.hardware_tier]
        }


class MILPTimingPredictor:
    """Predicts MILP solving time BEFORE the optimization starts based on problem structure"""

    def __init__(self):
        self.hardware_tier = HardwareDetector.detect_hardware_tier()

        # UPDATED with ACTUAL test results from our recent runs!
        self.benchmark_data = {
            'simple_case': {  # examples/04.jpg with threshold 20
                'elements': {'walls': 119, 'doors': 28, 'icons': 9},
                'lp_stats': {'variables': 5020, 'constraints': 1997, 'elements': 8176},
                'solve_time': 10.0,  # ACTUAL measured time - excellent prediction
                'complexity_score': 45.2
            },
            'medium_case': {  # examples/13.png with threshold 100
                'elements': {'walls': 178, 'doors': 57, 'icons': 17},
                'lp_stats': {'variables': 7536, 'constraints': 3617, 'elements': 14182},
                'solve_time': 17.6,  # ACTUAL measured time (was predicted 10.0s)
                'complexity_score': 73.8
            },
            'complex_case': {  # examples/08.jpg with threshold 35
                'elements': {'walls': 281, 'doors': 49, 'icons': 11},
                'lp_stats': {'variables': 11716, 'constraints': 7749, 'elements': 27002},
                'solve_time': 127.2,  # ACTUAL measured time from latest run (CGL preprocessing heavy)
                'complexity_score': 244.1
            }
        }

        # RECALIBRATED hardware factors based on actual performance
        self.hardware_factors = {
            'fast': {'base_factor': 0.7, 'complexity_scaling': 0.85},
            'medium': {'base_factor': 1.0, 'complexity_scaling': 1.0},   # Current machine baseline
            'slow': {'base_factor': 1.4, 'complexity_scaling': 1.3}
        }

    def predict_milp_time_pre_solve(self, milp_problem_data, threshold_info=None):
        """
        Predict MILP solving time BEFORE model.solve() is called using THRESHOLD-AWARE model

        Args:
            milp_problem_data: Dictionary containing:
                - wall_count: Number of wall lines
                - door_count: Number of door lines
                - icon_count: Number of icons
                - conflict_pairs: Number of conflict constraints
                - wall_neighbors: Complexity of wall neighbor relationships
                - constraint_density: Estimated constraint matrix density
            threshold_info: Dictionary containing:
                - wall_threshold: Wall detection threshold (1-1000)
                - door_threshold: Door detection threshold (1-1000)
                - icon_threshold: Icon detection threshold (1-1000)
        """

        # Extract problem characteristics
        wall_count = milp_problem_data.get('wall_count', 0)
        door_count = milp_problem_data.get('door_count', 0)
        icon_count = milp_problem_data.get('icon_count', 0)
        conflict_pairs = milp_problem_data.get('conflict_pairs', 0)
        wall_neighbors = milp_problem_data.get('wall_neighbors', 0)

        # Extract threshold information (defaults to medium sensitivity)
        if threshold_info is None:
            threshold_info = {'wall_threshold': 500, 'door_threshold': 500, 'icon_threshold': 500}

        wall_threshold = threshold_info.get('wall_threshold', 500)

        # Apply threshold-aware complexity adjustment BEFORE estimation
        adjusted_problem_data = self._apply_threshold_aware_adjustment(
            milp_problem_data, threshold_info
        )

        # Use adjusted values for estimation
        adjusted_wall_count = adjusted_problem_data['effective_wall_count']
        adjusted_conflict_pairs = adjusted_problem_data['effective_conflicts']
        structural_quality = adjusted_problem_data['structural_quality']

        # Estimate LP problem size using adjusted values
        estimated_variables = self._estimate_variables(adjusted_wall_count, door_count, icon_count)
        estimated_constraints = self._estimate_constraints(adjusted_wall_count, door_count, icon_count, adjusted_conflict_pairs)
        estimated_elements = self._estimate_matrix_elements(adjusted_wall_count, door_count, icon_count, wall_neighbors)

        # Calculate threshold-aware complexity score
        complexity_score = self._calculate_threshold_aware_complexity_score({
            'variables': estimated_variables,
            'constraints': estimated_constraints,
            'elements': estimated_elements,
            'wall_count': adjusted_wall_count,
            'original_wall_count': wall_count,
            'conflict_density': adjusted_conflict_pairs / max(adjusted_wall_count, 1),
            'structural_quality': structural_quality,
            'threshold_regime': self._classify_threshold_regime(wall_threshold)
        })

        # Store values for timing model access
        self._last_wall_count = adjusted_wall_count
        self._last_original_wall_count = wall_count
        self._last_structural_quality = structural_quality
        self._last_threshold_regime = self._classify_threshold_regime(wall_threshold)

        # Apply threshold-aware timing model
        predicted_time = self._apply_threshold_aware_timing_model(
            complexity_score, estimated_variables, estimated_constraints, threshold_info
        )

        # Hardware adjustment
        hw_factor = self.hardware_factors[self.hardware_tier]
        predicted_time *= hw_factor['base_factor']

        if complexity_score > 100:  # Complex problem threshold
            predicted_time *= hw_factor['complexity_scaling']

        return {
            'predicted_time': max(1.0, min(predicted_time, 600.0)),  # 1s to 10min bounds
            'complexity_score': complexity_score,
            'estimated_variables': estimated_variables,
            'estimated_constraints': estimated_constraints,
            'estimated_elements': estimated_elements,
            'problem_category': self._categorize_threshold_aware_problem(complexity_score, structural_quality),
            'confidence': self._get_threshold_aware_confidence(complexity_score, structural_quality, wall_threshold),
            'threshold_analysis': {
                'regime': self._classify_threshold_regime(wall_threshold),
                'structural_quality': structural_quality,
                'effective_walls': adjusted_wall_count,
                'original_walls': wall_count,
                'noise_reduction': f"{((wall_count - adjusted_wall_count) / wall_count * 100):.1f}%" if wall_count > 0 else "0%"
            }
        }

    def _estimate_variables(self, wall_count, door_count, icon_count):
        """Estimate number of LP variables based on elements"""
        # From IP.py analysis:
        # w_p: len(wallPoints) binary variables
        # w_l: len(wallLines) binary variables
        # d_l: len(doorLines) binary variables
        # i_r: len(icons) binary variables
        # i_types: len(icons) * NUM_ICONS binary variables
        # l_dir_labels: len(wallLines) * 2 * NUM_ROOMS binary variables

        NUM_ICONS = 6  # From constants
        NUM_ROOMS = 12  # From constants

        # Estimate wall points (roughly 0.7 * wall_lines based on empirical data)
        estimated_wall_points = int(wall_count * 0.7)

        variables = (
            estimated_wall_points +  # w_p
            wall_count +  # w_l
            door_count +  # d_l
            icon_count +  # i_r
            (icon_count * NUM_ICONS) +  # i_types
            (wall_count * 2 * NUM_ROOMS)  # l_dir_labels
        )

        return variables

    def _estimate_constraints(self, wall_count, door_count, icon_count, conflict_pairs):
        """Estimate number of LP constraints"""
        NUM_ROOMS = 12

        constraints = (
            (wall_count * 2) +  # Semantic label one hot constraints
            (wall_count * 8) +  # Loop constraints (estimated)
            conflict_pairs +  # Conflict constraints
            door_count +  # Door wall constraints
            icon_count +  # Icon type constraints
            (wall_count * 4) +  # Line sum constraints (estimated)
            50  # Misc constraints (exterior, etc.)
        )

        return constraints

    def _estimate_matrix_elements(self, wall_count, door_count, icon_count, wall_neighbors):
        """Estimate constraint matrix density (non-zero elements)"""
        # Based on CBC output: complex case had 40,619 elements for 379 walls
        # This suggests roughly 100-150 elements per wall line

        base_elements_per_wall = 120
        complexity_multiplier = 1 + (wall_neighbors / max(wall_count, 1))  # More neighbors = denser matrix

        estimated_elements = (
            (wall_count * base_elements_per_wall * complexity_multiplier) +
            (door_count * 50) +  # Doors create fewer constraints
            (icon_count * 30)    # Icons create moderate constraints
        )

        return int(estimated_elements)

    def _calculate_complexity_score(self, problem_stats):
        """Calculate overall problem complexity score using IMPROVED formula"""
        variables = problem_stats['variables']
        constraints = problem_stats['constraints']
        elements = problem_stats['elements']
        wall_count = problem_stats['wall_count']
        conflict_density = problem_stats.get('conflict_density', 0)

        # Store conflict density for use in timing model
        self._last_conflict_density = conflict_density

        # IMPROVED complexity formula that distinguishes simple vs complex cases
        # Key insight: Simple problems solve during preprocessing regardless of conflicts

        # Primary complexity drivers (structural)
        var_score = (variables / 1000) ** 1.15  # Slightly super-linear
        wall_score = (wall_count / 100) ** 1.25  # Non-linear scaling confirmed by tests
        density_score = (constraints / 1000) ** 1.1

        # FIXED conflict complexity - cap impact for simple structural problems
        # Conflicts matter for branch-and-bound, but not preprocessing time
        base_conflict_score = conflict_density * 5  # Reduced from 10

        # Progressive conflict penalty - only kicks in for genuinely complex structures
        if wall_count > 250 and variables > 8000:
            # Complex structural case: conflicts significantly impact solve time
            conflict_multiplier = 2.0
        elif wall_count > 150 and variables > 5000:
            # Medium structural case: conflicts moderately impact solve time
            conflict_multiplier = 1.5
        else:
            # Simple structural case: conflicts have minimal impact (solved in preprocessing)
            conflict_multiplier = 0.3  # Heavily reduced impact

        conflict_score = base_conflict_score * conflict_multiplier

        # Matrix sparsity factor (unchanged)
        sparsity_score = elements / max(variables * constraints, 1) * 500

        complexity_score = var_score + wall_score + density_score + conflict_score + sparsity_score

        return complexity_score

    def _apply_calibrated_timing_model(self, complexity_score, variables, constraints):
        """Apply ENHANCED 4-TIER timing model based on comprehensive test data analysis"""

        # ENHANCED: 4-tiered model based on comprehensive CBC solver behavior analysis
        # Tier 1: Preprocessing-only (0 nodes, pure CGL preprocessing)
        # Tier 2: Light optimization (minimal branch-and-bound, quick feasibility pump)
        # Tier 3: Standard complexity (moderate preprocessing + branch-and-bound)
        # Tier 4: Extreme complexity (heavy preprocessing + extensive feasibility pump)

        # Get structural complexity indicators
        wall_count = getattr(self, '_last_wall_count', variables // 25)
        conflict_density = getattr(self, '_last_conflict_density', 0)

        # TIER 1: Pure Preprocessing (CBC solves during CGL preprocessing)
        if complexity_score < 32:  # Fine-tuned threshold based on 13.png success
            # These problems solve with "0 iterations and 0 nodes"
            # Actual data: 13.png (42.1 complexity) took 10.2s
            base_time = 1.5  # Reduced base time
            complexity_factor = complexity_score * 0.18  # Slightly increased scaling
            predicted_time = base_time + complexity_factor

        # TIER 2: Light Optimization (minimal branch-and-bound needed)
        elif complexity_score < 80:  # Adjusted threshold to better capture medium cases
            # These problems need some optimization but solve relatively quickly
            # Actual data: 04.jpg (43.8 complexity) took 44.2s - was underestimated
            simple_estimate = 1.5 + 32 * 0.18  # What tier 1 would predict at boundary
            medium_target = 35.0  # Increased target based on 44.2s actual measurement

            # Smooth transition with slight curve for better medium complexity handling
            progress = (complexity_score - 32) / (80 - 32)  # 0 to 1
            curve_factor = 1 + (progress * 0.3)  # Slight exponential curve
            predicted_time = simple_estimate + (progress * curve_factor) * (medium_target - simple_estimate)

        # TIER 3: Standard Complex (full solver engagement)
        elif complexity_score < 250:  # New threshold for extreme cases
            # These problems require significant preprocessing + branch-and-bound
            # Actual data: 10.jpg (296.7 complexity) took 150.6s - well predicted at 108.6s
            base_time = 18.0  # Slightly increased base
            log_factor = 7.5   # Fine-tuned logarithmic factor
            complexity_offset = 80.0  # Start from tier 2 boundary

            log_component = log_factor * np.log(complexity_score - complexity_offset + 1)
            predicted_time = base_time + log_component

            # Apply structural complexity penalties for complex problems
            if variables > 10000:  # Lowered threshold
                preprocessing_factor = 1 + ((variables - 10000) / 20000) * 0.15
                predicted_time *= preprocessing_factor

            if constraints > 6000:  # Lowered threshold
                constraint_factor = 1 + ((constraints - 6000) / 15000) * 0.10
                predicted_time *= constraint_factor

        # TIER 4: EXTREME Complexity (exponential scaling for mega-problems)
        else:
            # NEW TIER for extreme cases like 08.jpg (509.8 complexity, 912.6s actual)
            # These problems trigger extensive CGL preprocessing + long feasibility pump
            base_time = 120.0  # 2 minutes base for extreme cases

            # Exponential scaling for extreme complexity
            excess_complexity = complexity_score - 250
            exponential_factor = 1.8  # Aggressive but not explosive scaling
            exponential_component = (excess_complexity / 100) ** exponential_factor

            predicted_time = base_time * (1 + exponential_component)

            # Additional penalties for mega-problems
            if wall_count > 400:  # Extreme wall count penalty
                wall_penalty = 1 + ((wall_count - 400) / 200) * 0.5
                predicted_time *= wall_penalty

            if variables > 20000:  # Extreme variable penalty
                var_penalty = 1 + ((variables - 20000) / 10000) * 0.3
                predicted_time *= var_penalty

            # Conflict density becomes critical in extreme cases
            if conflict_density > 40:
                extreme_conflict_penalty = 1 + ((conflict_density - 40) / 20) * 0.4
                predicted_time *= min(extreme_conflict_penalty, 2.0)  # Cap at 2x penalty

        # Global conflict penalty - now more nuanced across tiers
        if complexity_score < 80:  # Tiers 1-2: minimal conflict impact
            if conflict_density > 35:
                conflict_penalty = 1 + (conflict_density - 35) * 0.003  # Very light impact
                predicted_time *= min(conflict_penalty, 1.10)
        elif complexity_score < 250:  # Tier 3: moderate conflict impact
            if conflict_density > 25:
                conflict_penalty = 1 + (conflict_density - 25) * 0.008
                predicted_time *= min(conflict_penalty, 1.25)
        # Tier 4 conflict penalty already handled above

        return predicted_time

    def _apply_threshold_aware_adjustment(self, milp_problem_data, threshold_info):
        """
        Apply threshold-aware adjustment to MILP problem data - FIXED VERSION

        The key insight: Low thresholds create MORE noise (more false walls),
        not fewer walls. We need to REDUCE effective wall count for low thresholds.
        """

        wall_count = milp_problem_data.get('wall_count', 0)
        door_count = milp_problem_data.get('door_count', 0)
        icon_count = milp_problem_data.get('icon_count', 0)
        conflict_pairs = milp_problem_data.get('conflict_pairs', 0)

        wall_threshold = threshold_info.get('wall_threshold', 500)
        door_threshold = threshold_info.get('door_threshold', 500)
        icon_threshold = threshold_info.get('icon_threshold', 500)

        if wall_count == 0:
            return {
                'effective_wall_count': 0,
                'effective_conflicts': 0,
                'structural_quality': 100
            }

        # FIXED: Noise reduction based on threshold sensitivity
        # Low threshold (1-50) = High noise = Need major reduction
        # High threshold (500+) = Low noise = Minimal reduction

        if wall_threshold <= 20:
            # Very low threshold: 70-85% of walls are noise
            noise_factor = 0.25  # Keep only 25% of walls
        elif wall_threshold <= 50:
            # Low threshold: 60-75% of walls are noise
            noise_factor = 0.35  # Keep only 35% of walls
        elif wall_threshold <= 100:
            # Medium-low threshold: 40-60% noise
            noise_factor = 0.55  # Keep 55% of walls
        elif wall_threshold <= 200:
            # Medium threshold: 20-40% noise
            noise_factor = 0.75  # Keep 75% of walls
        elif wall_threshold <= 500:
            # Medium-high threshold: 10-25% noise
            noise_factor = 0.90  # Keep 90% of walls
        else:
            # High threshold: minimal noise
            noise_factor = 0.95  # Keep 95% of walls

        # Calculate effective wall count
        effective_wall_count = max(1, int(wall_count * noise_factor))

        # Adjust conflicts proportionally
        conflict_reduction_factor = effective_wall_count / wall_count
        effective_conflicts = max(0, int(conflict_pairs * conflict_reduction_factor))

        # FIXED: Structural quality (0-100, higher = better structure)
        noise_reduction_percent = ((wall_count - effective_wall_count) / wall_count) * 100
        structural_quality = 100 - noise_reduction_percent  # Higher = less noise = better structure

        return {
            'effective_wall_count': effective_wall_count,
            'effective_conflicts': effective_conflicts,
            'structural_quality': structural_quality
        }

    def _calculate_threshold_aware_complexity_score(self, problem_stats):
        """Calculate complexity score with threshold awareness - FIXED VERSION"""
        variables = problem_stats['variables']
        constraints = problem_stats['constraints']
        elements = problem_stats['elements']
        wall_count = problem_stats['wall_count']
        conflict_density = problem_stats.get('conflict_density', 0)
        structural_quality = problem_stats.get('structural_quality', 0)

        # Ensure minimum values to avoid division by zero
        wall_count = max(wall_count, 1)

        # Base complexity components (same as calibrated model)
        var_score = (variables / 1000) ** 1.15
        wall_score = (wall_count / 100) ** 1.25
        density_score = (constraints / 1000) ** 1.1

        # Conflict penalty (moderate impact)
        conflict_score = conflict_density * 2.0

        # FIXED: Structural quality adjustment (much smaller impact)
        # Don't let this make the score negative!
        structural_adjustment = min(structural_quality * 0.05, wall_score * 0.3)  # Cap at 30% of wall complexity

        # Combined complexity score (ensure it stays positive)
        complexity_score = var_score + wall_score + density_score + conflict_score - structural_adjustment

        # Ensure minimum complexity score
        return max(complexity_score, 1.0)

    def _apply_threshold_aware_timing_model(self, complexity_score, variables, constraints, threshold_info):
        """
        Apply threshold-aware timing model - ENHANCED for low threshold scenarios

        The key insight from analysis: Low thresholds create geometric complexity that
        persists even after noise reduction. We need additional penalties for low threshold cases.
        """

        wall_threshold = threshold_info.get('wall_threshold', 500)
        door_threshold = threshold_info.get('door_threshold', 500)
        icon_threshold = threshold_info.get('icon_threshold', 500)

        # Get base prediction from calibrated model
        predicted_time = self._apply_calibrated_timing_model(complexity_score, variables, constraints)

        # ENHANCED: Low threshold geometric complexity penalty
        # Analysis shows 343% avg error for low thresholds vs 26% for medium thresholds

        if wall_threshold <= 10:
            # Very low threshold: extreme geometric complexity
            # Analysis: 784% error (04.jpg WT 10) - massive underestimate
            low_threshold_penalty = 4.5  # 450% increase
            predicted_time *= low_threshold_penalty

        elif wall_threshold <= 20:
            # Low threshold: high geometric complexity
            # Analysis: 70-168% errors - significant underestimate
            low_threshold_penalty = 2.2  # 220% increase
            predicted_time *= low_threshold_penalty

        elif wall_threshold <= 50:
            # Medium-low threshold: moderate geometric complexity
            # Analysis: 353% error (13.png WT 50) - major underestimate
            low_threshold_penalty = 2.8  # 280% increase
            predicted_time *= low_threshold_penalty

        elif wall_threshold <= 100:
            # Medium threshold: some additional complexity
            # Analysis: 8-44% errors - much better but still some underestimate
            medium_threshold_penalty = 1.3  # 30% increase
            predicted_time *= medium_threshold_penalty

        elif wall_threshold <= 300:
            # Medium-high threshold: minimal additional complexity
            predicted_time *= 1.1  # 10% increase

        # Additional penalties based on structural quality for low thresholds
        structural_quality = getattr(self, '_last_structural_quality', 50)

        if wall_threshold <= 50 and structural_quality < 50:
            # Low threshold + poor structure = extra penalty
            structure_penalty = 1 + ((50 - structural_quality) / 100)  # Up to 50% extra
            predicted_time *= structure_penalty

        # Original threshold adjustments (now less significant)
        if door_threshold < 300:
            predicted_time *= 1.02  # Minimal impact
        elif door_threshold > 700:
            predicted_time *= 1.03

        if icon_threshold < 300:
            predicted_time *= 1.02  # Minimal impact
        elif icon_threshold > 700:
            predicted_time *= 1.03

        return max(1.0, min(predicted_time, 600.0))  # Clamp to 1s - 10min range

    def _categorize_problem(self, complexity_score):
        """Categorize problem difficulty based on ENHANCED 4-TIER thresholds"""
        if complexity_score < 32:
            return "Simple (expected: <12s solve time)"
        elif complexity_score < 80:
            return "Medium (expected: 12-40s solve time)"
        elif complexity_score < 250:
            return "Complex (expected: 40-180s solve time)"
        else:
            return "Extreme (expected: >180s solve time)"

    def _categorize_threshold_aware_problem(self, complexity_score, structural_quality):
        """Categorize problem with threshold awareness"""
        if complexity_score < 32 and structural_quality > 50:
            return "Simple (well-structured)"
        elif complexity_score < 80 and structural_quality > 20:
            return "Medium (moderate structure)"
        elif complexity_score < 250:
            return "Complex (requires optimization)"
        else:
            return "Extreme (high complexity, low structure)"

    def _get_prediction_confidence(self, complexity_score):
        """Get confidence level for the prediction based on 4-tier system"""
        if complexity_score < 32:
            return "High (Tier 1 - well-tested simple cases)"
        elif complexity_score < 80:
            return "Medium-High (Tier 2 - calibrated from test data)"
        elif complexity_score < 250:
            return "Medium (Tier 3 - validated complex cases)"
        else:
            return "Low-Medium (Tier 4 - extreme complexity, new model)"

    def _get_threshold_aware_confidence(self, complexity_score, structural_quality, wall_threshold):
        """
        Get confidence level for threshold-aware prediction

        Args:
            complexity_score: Calculated complexity score
            structural_quality: Structural quality metric
            wall_threshold: Wall detection threshold

        Returns:
            Confidence level string
        """

        if complexity_score < 32 and structural_quality > 50:
            return "High (simple problem, well-structured)"
        elif complexity_score < 80 and structural_quality > 20:
            return "Medium-High (moderate complexity, decent structure)"
        elif complexity_score < 250:
            return "Medium (complexity present, structure variable)"
        else:
            return "Low (high complexity, low confidence)"

    def _classify_threshold_regime(self, wall_threshold):
        """
        Classify threshold into regime categories

        Args:
            wall_threshold: Wall detection threshold (1-1000)

        Returns:
            String indicating threshold regime
        """
        if wall_threshold < 50:
            return "low_sensitivity"  # Detects many small features (noise-heavy)
        elif wall_threshold < 200:
            return "medium_sensitivity"  # Balanced detection
        elif wall_threshold < 600:
            return "high_sensitivity"  # Only major features
        else:
            return "very_high_sensitivity"  # Only strongest features


class PhaseTimeLogger:
    """Utility class for logging phase start/completion times"""

    @staticmethod
    def log_step_start(step_name, estimated_time):
        """Log the start of a processing step with time estimate"""
        print(f"Info: {step_name} - Estimated {estimated_time:.1f}s")
        return time.time()

    @staticmethod
    def log_step_complete(step_name, start_time, success=True):
        """Log the completion of a processing step with actual time"""
        actual_time = time.time() - start_time
        status = "✓" if success else "✗"
        print(f"Info: {step_name} - {status} {actual_time:.1f}s")
        return actual_time

    @staticmethod
    def log_drawhouse_phase_start(phase_name, estimated_time):
        """Log DrawHouse phase start for frontend parsing"""
        print(f"DrawHouse: Starting {phase_name} - Estimated {estimated_time:.1f}s")
        return time.time()

    @staticmethod
    def log_drawhouse_phase_complete(phase_name, start_time, success=True):
        """Log DrawHouse phase completion for frontend parsing"""
        actual_time = time.time() - start_time
        status = "Complete" if success else "Failed"
        print(f"DrawHouse: {phase_name} {status} - {actual_time:.1f}s")
        return actual_time


# Convenience function to create timing predictors
def create_timing_predictor():
    """Create a basic timing predictor instance"""
    return TimingPredictor()


def create_milp_predictor():
    """Create a MILP-specific timing predictor instance"""
    return MILPTimingPredictor()


def get_hardware_info():
    """Get current hardware information for debugging"""
    tier = HardwareDetector.detect_hardware_tier()
    try:
        import psutil
        cpu_count = psutil.cpu_count(logical=True)
        memory_gb = psutil.virtual_memory().total / (1024**3)
        return {
            'tier': tier,
            'cpu_count': cpu_count,
            'memory_gb': round(memory_gb, 1)
        }
    except:
        return {'tier': tier, 'cpu_count': 'unknown', 'memory_gb': 'unknown'}
