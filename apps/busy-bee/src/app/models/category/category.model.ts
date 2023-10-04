export interface CategoryModel {
  id: string;
  title: string;
  parentId?: string;
  iconFilename: string;
  children?: CategoryModel[];
  type: string;
}
