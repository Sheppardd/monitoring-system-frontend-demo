import {Trolley} from './Trolley'
import {Station} from './Station'

export interface Area
{
  id: string;
  createdAt: string;
  trolleys: Trolley[];
  stations: Station[];
}
