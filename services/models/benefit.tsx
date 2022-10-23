import { IconName } from "@fortawesome/pro-light-svg-icons";

export interface Benefit {
    id: number;
    type: BenefitsType;
    attributes: BenefitAttributes;
    category: BenefitCategory;
}

interface BenefitAttributes {
    name: string;
}

export interface BenefitCategory {
    id: number;
    type: CategoriesType;
    attributes: BenefitCategoryAttributes;
}

interface BenefitCategoryAttributes {
    icon: IconName;
    name: string;
    shortDescription: string;
}

type CategoriesType = 'categories';
type BenefitsType = 'benefits';

export default Benefit;