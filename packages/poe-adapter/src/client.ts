import { PlatformModelClient } from 'koishi-plugin-chatluna/lib/llm-core/platform/client'
import { ChatHubChatModel } from 'koishi-plugin-chatluna/lib/llm-core/platform/model'
import {
    ModelInfo,
    ModelType
} from 'koishi-plugin-chatluna/lib/llm-core/platform/types'
import { Context } from 'koishi'
import { Config } from '.'
import { PoeRequester } from './requester'
import { PoeClientConfig } from './types'
import { maxTokenCount } from './utils'

export class PoeClient extends PlatformModelClient<PoeClientConfig> {
    platform = 'poe'

    private _requester: PoeRequester

    private _models: ModelInfo[]

    constructor(
        ctx: Context,
        private _config: Config,
        clientConfig: PoeClientConfig
    ) {
        super(ctx, clientConfig)

        this._requester = new PoeRequester(ctx, clientConfig)
    }

    async init(): Promise<void> {
        if (this._models) {
            return
        }

        await this._requester.init()

        const models = await this.getModels()

        this._models = models
    }

    async getModels(): Promise<ModelInfo[]> {
        if (this._models) {
            return this._models
        }

        const rawModels = await this._requester.getModels()

        const models = rawModels.map((rawModel) => {
            return {
                name: rawModel,
                type: ModelType.llm,
                maxTokens: maxTokenCount(rawModel),
                supportChatMode: () => true
            }
        })

        this._models = models

        return models
    }

    protected _createModel(model: string): ChatHubChatModel {
        return new ChatHubChatModel({
            requester: this._requester,
            model,
            modelMaxContextSize: maxTokenCount(model),
            timeout: this._config.timeout,
            maxRetries: this._config.maxRetries,
            llmType: 'poe'
        })
    }
}
