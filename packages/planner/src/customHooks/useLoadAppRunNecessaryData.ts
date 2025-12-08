import { useEffect } from 'react';
import { requestToLoadTextureAssets } from '../zustand/useTextureAssets';
import { requestToLoadCatalogData } from '../zustand/useCatalogData';
import { requestToLoadQuickTourData } from '../zustand/useQuickTourData';
import { requestToLoadModelTextureOverlays } from '../zustand/useModelTextureOverlays';
import { requestToLoadFeatureTips } from '../zustand/useFeatureTips';
import { requestToLoadPaymentPlans } from '../zustand/usePaymentPlans';

export const useLoadAppRunNecessaryData = () => {
  useEffect(() => {
    void requestToLoadTextureAssets();
    void requestToLoadCatalogData();
    void requestToLoadQuickTourData();
    void requestToLoadModelTextureOverlays();
    void requestToLoadFeatureTips();
    void requestToLoadPaymentPlans();
  }, []);
};
