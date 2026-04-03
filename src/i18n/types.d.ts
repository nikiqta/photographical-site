declare module '@types-support-intl' {
    import type { createTranslator, Messages } from 'next-intl'

    export type TFunction<scope extends keyof Messages | undefined = undefined> =
        scope extends keyof Messages
            ? ReturnType<typeof createTranslator<Messages[scope]>>
            : ReturnType<typeof createTranslator<Messages>>
}
