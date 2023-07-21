import { Context } from 'koishi';
import { Config } from '../config';
import { ChatChain } from '../chains/chain';
import { RenderType } from '../types';
import { ChatMode } from '../middlewares/resolve_room';

export function apply(ctx: Context, config: Config, chain: ChatChain) {

    ctx.command('chathub', 'chathub相关指令', {
        authority: 1,
    }).alias("chathub")

    ctx.command('chathub.chat', 'chathub 聊天相关指令', {
        authority: 1,
    })

    ctx.command("chathub.chat.text <message:text>", "开始和模型进行对话")
        .option("chatMode", "-c <chatMode:string> 选择聊天模式", {
            authority: 1,
        })
        .option("model", "-m <model:string> 选择聊天模型", {
            authority: 1,
        })
        .alias("聊天")
        .action(async ({ options, session }, message) => {
            await chain.receiveCommand(
                session, "", {
                message: message,
                setModel: options.model,
                renderOptions: {
                    split: config.splitMessage,
                    type: config.outputMode as RenderType
                },
                chatMode: (options.chatMode as ChatMode) ?? config.chatMode as ChatMode
            }
            )
        })

    ctx.command("chathub.chat.voice [model:string] <message:text>", "和模型进行对话并输出为语音")
        .option("chatMode", "-c <chatMode:string> 选择聊天模式（目前还不可用）", {
            authority: 1,
        })
        .option("speaker", "-s <speakerId:number> 语音服务的目标人物的ID", {
            authority: 1,
        })
        .alias("语音聊天")
        .action(async ({ options, session }, model, message, chatMode) => {
            await chain.receiveCommand(
                session, "", {
                message: message || model,
                setModel: message == null ? null : model,
                renderOptions: {
                    split: config.splitMessage,
                    type: "voice",
                    voice: {
                        speakerId: options.speaker
                    }
                },
                chatMode: (options.chatMode as ChatMode) ?? config.chatMode as ChatMode
            }
            )
        })


    ctx.command("chathub.wipe", "清空 chathub 的所有使用数据", {
        authority: 3,
    })
        .alias("双清 chathub")
        .action(async ({ session }) => {
            await chain.receiveCommand(
                session, "wipe"
            )
        })
}