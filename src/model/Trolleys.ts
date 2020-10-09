import {Trolley} from './Trolley'

export interface Trolleys
{
  total: number;
  busy: number;
  idle: number;
  trolley: Trolley[];
}