interface BeepItem {
  enable: boolean;
  value?: number;
}

export interface BeepSettings {
  heightFor1?: BeepItem;
  heightFor2?: BeepItem;
  heightFor3?: BeepItem;
  heightForLong?: BeepItem;
}
