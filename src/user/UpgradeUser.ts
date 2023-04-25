import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import { GetUser } from './GetUser';
import generateCode from './UserAuthCodes';
import { ModifyAudioEdition } from './ModifyAudioEdition';
import { ModifyVideoEdition } from './ModifyVideoEdition';
import { ModifyWarpstagramEdition } from './ModifyWarpstagramEdition';

export async function UpgradeUser(data: any, moduleType: string, moduleEdition: string) {
    const code = await generateCode(moduleType, moduleEdition);
    // console.log(moduleType, moduleEdition, code);
    // console.log(data.email);
    let user;
    try {
        user = await GetUser(data);

        if (moduleType === 'audio') {
            return ModifyAudioEdition(data, moduleType, moduleEdition);
        }
        if (moduleType === 'video') {
            return ModifyVideoEdition(data, moduleType, moduleEdition);
        }
        if (moduleType === 'warpstagram') {
            return ModifyWarpstagramEdition(data, moduleType, moduleEdition);
        }
        if (moduleEdition === 'free') {
            user = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: data.email,
                    audio: moduleEdition,
                    video: moduleEdition,
                    warpstagram: moduleEdition,
                    audioAuthCode: '',
                    videoAuthCode: '',
                    warpstagramAuthCode: '',
                },
            });
        }
        if (moduleType === 'all') {
            user = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: data.email,
                    audio: moduleEdition,
                    video: moduleEdition,
                    warpstagram: moduleEdition,
                    audioAuthCode: await generateCode(moduleType, moduleEdition),
                    videoAuthCode: await generateCode(moduleType, moduleEdition),
                    warpstagramAuthCode: await generateCode(moduleType, moduleEdition),
                },
            });
        }

        return user;
    } catch (error) {
        console.log(error);
    }
    // console.log(moduleType, moduleEdition);
}
