import { CompanyModel } from './company-model';

export class ComputerModel {
    id: string;
    name: string;
    introduced: string;
    discontinued: string;
    company: CompanyModel;
    version: number;
}
