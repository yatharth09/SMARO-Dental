import {faker} from "@faker-js/faker";
import {BranchTypes} from "@/types";

function createBranch():BranchTypes
{
    const address = faker.location.secondaryAddress() + ","+ faker.location.secondaryAddress()+","+faker.location.city()+","+faker.location.zipCode();
    return {
        admin_id: 0,
        available_tests: faker.helpers.arrayElement(["a","b"]),
        location_lat_long: faker.location.latitude()+ ","+ faker.location.longitude(),
        client_id: faker.number.int(300),
        client_name: faker.company.name(),
        inserted_by: faker.number.int(300),
        timing: faker.date.anytime().toTimeString(),
        id: faker.number.int(300),
        branch_address: address,
        branch_name: faker.company.name(),
        contact_no: faker.phone.number(),
        email:faker.internet.email(),
        inserted_time: faker.date.anytime(),
        status: faker.helpers.arrayElement([1,0])
    }
}

export {createBranch};
