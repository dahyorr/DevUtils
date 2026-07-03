import { useUi } from 'hooks'

export const useHeaderProgress = () => {
    const { displayHeaderProgressBar, hideHeaderProgressBar } = useUi()

    const showProgress = () => {
        displayHeaderProgressBar()
    }

    const hideProgress = () => {
        hideHeaderProgressBar()
    }

    return [showProgress, hideProgress]
}