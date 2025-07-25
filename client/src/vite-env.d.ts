/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMOB_APP_ID: string
  readonly VITE_ADMOB_BANNER_ID: string
  readonly VITE_ADMOB_INTERSTITIAL_ID: string
  readonly VITE_ADMOB_REWARDED_ID: string
  readonly VITE_ADMOB_NATIVE_ID: string
  readonly VITE_ADMOB_APP_OPEN_ID: string
  readonly VITE_UNITY_GAME_ID: string
  readonly VITE_UNITY_BANNER_PLACEMENT: string
  readonly VITE_UNITY_INTERSTITIAL_PLACEMENT: string
  readonly VITE_UNITY_REWARDED_PLACEMENT: string
  readonly VITE_ENABLE_UNITY_ADS: string
  readonly VITE_ENABLE_AD_MEDIATION: string
  readonly VITE_AD_FREQUENCY_MINUTES: string
  readonly VITE_REWARDED_AD_COIN_AMOUNT: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
