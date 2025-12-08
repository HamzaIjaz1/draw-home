"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectId = exports.isProjectId = exports.NanoId = exports.isNanoId = void 0;
const common_1 = require("./common");
const utils_1 = require("../utils");
const isNanoId = (e) => (0, common_1.isNonEmptyString)(e);
exports.isNanoId = isNanoId;
const NanoId = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isNanoId, 'NanoId'));
exports.NanoId = NanoId;
const isProjectId = (e) => (0, exports.isNanoId)(e);
exports.isProjectId = isProjectId;
const ProjectId = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isProjectId, 'ProjectId'));
exports.ProjectId = ProjectId;
//# sourceMappingURL=nanoId.js.map