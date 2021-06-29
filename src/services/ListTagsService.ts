import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"
import { classToPlain } from "class-transformer";

class ListTagsService {
    async execute() {
        const tagsRepositoreis = getCustomRepository(TagsRepositories);

        const tags = await tagsRepositoreis.find();

        return classToPlain(tags);
    }
}

export { ListTagsService}