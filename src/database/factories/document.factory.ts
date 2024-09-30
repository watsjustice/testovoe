import { Document } from '../../services/document/entities/document.entity';
import { setSeederFactory } from "typeorm-extension";

export const DocumentFactory = setSeederFactory(Document, (faker) => {
    const document = new Document();
    document.title = faker.company.buzzPhrase();

    return document;
});
