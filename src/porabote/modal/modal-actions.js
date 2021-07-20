import {SHOW_MODAL, CLOSE_MODAL, PUSH_TO_MODAL, REMOVE_ITEM} from './modal-types'

export function showModal(Element, title)
{
    return {
        type: SHOW_MODAL
    }
}

export function pushToModal({Component, title})
{
    return {
        type: PUSH_TO_MODAL,
        payload: {
            title: title,
            content: Component
        }
    }
}

export function closeModal()
{
    return {
        type: CLOSE_MODAL
    }
}

export function removeItem(tabKey, itemsCount)
{
    return {
        type: REMOVE_ITEM,
        payload: {
            tabKey: tabKey,
            isOpen: (--itemsCount) ? true : false
        }
    }
}