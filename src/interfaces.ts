interface BootstrapThreeMenuConstructor {
  new (element: string, hover?: boolean): BootstrapThreeMenuInterface;
}

export interface BootstrapThreeMenuInterface {
  init(): void;
}

export function setBcMenu(sbm: BootstrapThreeMenuConstructor, element: string, hover?: boolean): BootstrapThreeMenuInterface {
  return new sbm(element, hover);
}
