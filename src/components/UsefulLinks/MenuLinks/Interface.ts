
import {ActiveMenuType} from './type';

export interface IMenuLinksProps {
    dataMenu: Record<string, any>[];
    arrayKeys: string[];
    firstMenu: boolean;
    level: number;
    activesMenu: ActiveMenuType[];
  }
  
export interface IMenuLinks {
    dataMenu: Record<string, any>;
    prevDataMenu?: Record<string, any>;
    arrayKeys?: string[];
    key: string;
  }