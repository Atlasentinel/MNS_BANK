export default interface IDAO<T> {
    create(item: T): Promise<String>;
    update(item: T): Promise<boolean>;
    delete(id: number): Promise<String>;
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T>;
}