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

interface BenefitCategory {
    attributes: BenefitCategoryAttributes;
    id: number;
    type: CategoriesType;
}

interface BenefitCategoryAttributes {
    icon: IconName;
    name: string;
    shortDescription: string;
}

type CategoriesType = 'categories';
type BenefitsType = 'benefits';

export default Benefit;