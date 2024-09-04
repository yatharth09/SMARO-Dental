import {FileUploadTypes} from "@/types";
import {faker} from "@faker-js/faker";

export function createFileUpload():FileUploadTypes {
    return {
        comment: faker.lorem.text(),
        file_name: faker.string.symbol(),
        id: faker.number.int(300),
        inserted_time: faker.date.anytime(),
        modality: faker.company.catchPhrase(),
        patient_name: faker.person.fullName(),
        status: faker.helpers.arrayElement(["Pending","In Progress","Completed"]),
        uploaded_by: faker.number.int(300),
        uploaded_by_user_name: faker.person.fullName()
    }
}
