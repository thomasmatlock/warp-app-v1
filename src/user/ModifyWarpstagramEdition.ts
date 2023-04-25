// import { PrismaClient, Prisma } from '@prisma/client';
// const prisma = new PrismaClient();
// import { GetUser } from './GetUser';
// import generateCode from './UserAuthCodes';

// export async function ModifyWarpstagramEdition(data: any, moduleType: string, moduleEdition: string) {
//     const code = await generateCode(moduleType, moduleEdition);
//     let user;
//     try {
//         user = await GetUser(data);
//         user = await prisma.user.update({
//             where: {
//                 id: user.id,
//             },
//             data: {
//                 email: data.email,
//                 warpstagram: moduleEdition,
//                 warpstagramAuthCode: user.warpstagramAuthCode.length > 0 ? user.warpstagramAuthCode : code,
//             },
//         });
//         return user;
//     } catch (error) {
//         console.log(error);
//     }
// }
