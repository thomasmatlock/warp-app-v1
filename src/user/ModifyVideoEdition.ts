// import { PrismaClient, Prisma } from '@prisma/client';
// const prisma = new PrismaClient();
// import { GetUser } from './GetUser';
// import generateCode from './UserAuthCodes';

// export async function ModifyVideoEdition(data: any, moduleType: string, moduleEdition: string) {
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
//                 video: moduleEdition,
//                 videoAuthCode: user.videoAuthCode.length > 0 ? user.videoAuthCode : code,
//             },
//         });
//         return user;
//     } catch (error) {
//         console.log(error);
//     }
// }
