import { CompanyModel } from './company-model';

export class ComputerModel {
    id: number;
    name: string;
    introduced: string;
    discontinued: string;
    company: CompanyModel;
}