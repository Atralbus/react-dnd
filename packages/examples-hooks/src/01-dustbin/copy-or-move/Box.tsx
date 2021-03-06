import { CSSProperties, FC } from 'react'
import { ItemTypes } from './ItemTypes'
import { useDrag, DragSourceMonitor } from 'react-dnd'

const style: CSSProperties = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	float: 'left',
}

export interface BoxProps {
	name: string
}

interface DropResult {
	allowedDropEffect: string
	dropEffect: string
	name: string
}

interface DragItem {
	name: string
	type: string
}

export const Box: FC<BoxProps> = ({ name }) => {
	const [{ opacity }, drag] = useDrag(
		() => ({
			item: { name, type: ItemTypes.BOX },
			end(item: DragItem | undefined, monitor: DragSourceMonitor) {
				const dropResult: DropResult = monitor.getDropResult()
				if (item && dropResult) {
					let alertMessage = ''
					const isDropAllowed =
						dropResult.allowedDropEffect === 'any' ||
						dropResult.allowedDropEffect === dropResult.dropEffect

					if (isDropAllowed) {
						const isCopyAction = dropResult.dropEffect === 'copy'
						const actionName = isCopyAction ? 'copied' : 'moved'
						alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
					} else {
						alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
					}
					alert(alertMessage)
				}
			},
			collect: (monitor: any) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
		}),
		[name],
	)

	return (
		<div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>
	)
}
