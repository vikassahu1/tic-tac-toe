import {
    TypeSafeClient,
    choice,
    noul,
    score,
    type EntryType,
    type Questions,
    type SystemOneResult,
} from '@typesafe-ai/sdk';

export { choice, noul, score };
export type { EntryType, Questions, SystemOneResult };

export interface JevClientOptions {
    apiKey?: string;
    baseURL?: string;
    model?: string;
}

export class JevClient {
    private readonly client: TypeSafeClient;

    constructor(opts: JevClientOptions = {}) {
        this.client = new TypeSafeClient({
            apiKey: opts.apiKey ?? process.env.TYPESAFE_API_KEY,
            baseURL: opts.baseURL ?? process.env.TYPESAFE_BASE_URL,
            defaultModel: opts.model ?? process.env.TYPESAFE_DEFAULT_MODEL ?? 'jev-latest',
        });
    }

    ask<const Q extends Questions>(
        state: EntryType,
        questions: Q,
        model?: string,
    ): Promise<SystemOneResult<Q>> {
        return this.client.systemOne({ state, questions, model });
    }
}

