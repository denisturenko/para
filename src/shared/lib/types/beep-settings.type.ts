interface BeepItem {
  enable: boolean;
  value?: number;
}

export interface BeepSettingsType {
  heightFor1?: BeepItem;
  heightFor2?: BeepItem;
  heightFor3?: BeepItem;
  heightForLong?: BeepItem;
  volume?: number;
}
