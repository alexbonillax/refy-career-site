export interface Value {
    id: number;
    type: "values";
    attributes: ValueAttributes;
}

interface ValueAttributes {
    name: string;
    pictures: string[];
    shortDescription: string;
    description: string;
}