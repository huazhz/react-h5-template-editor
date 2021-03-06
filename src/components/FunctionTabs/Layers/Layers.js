// @flow
import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Button } from 'antd'
import { listItemSortByOrder } from '@/utils/helpers/listItemSortByOrder'

const layerItemStyle = {
  background: '#fff',
  borderTop: '1px solid #ece6e6',
  padding: '15px 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const selected = {
  ...layerItemStyle,
  color: 'red'
}

const SortableItem = SortableElement(
  ({ value, selectedId, deleteCom, targetPageId }) => {
    let bindStyle = selectedId === value.id ? selected : layerItemStyle
    return (
      <div className="layer-item" style={bindStyle}>
        {value.attribute.name}
        <Button>设置</Button>
        <Button type="danger" onClick={() => deleteCom(value.id, targetPageId)}>
          删除
        </Button>
      </div>
    )
  }
)

const SortableList = SortableContainer(
  ({ items, selectedId, deleteCom, targetPageId }) => {
    return (
      <div className="layers">
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            selectedId={selectedId}
            deleteCom={deleteCom}
            targetPageId={targetPageId}
          />
        ))}
      </div>
    )
  }
)

type Props = {
  order: Array<number>,
  oldIndex: number,
  newIndex: number,
  targetPageId: string,
  currentComId: string,
  layers: Array<Object>,
  updateComZindex: (
    order: Array<number>,
    oldIndex: number,
    newIndex: number,
    targetPageId: string,
    layers: Array<Object>
  ) => void,
  deleteCom: (id: string, target: string) => void
}

class Layers extends React.Component<Props> {
  onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number,
    newIndex: number
  }) => {
    const { order, updateComZindex, targetPageId, layers } = this.props
    updateComZindex(
      order,
      oldIndex,
      newIndex,
      targetPageId,
      listItemSortByOrder(layers, order)[oldIndex].id
    )
  }
  render() {
    const { layers, order, currentComId, deleteCom, targetPageId } = this.props
    let layersSorted = listItemSortByOrder(layers, order)
    return (
      <SortableList
        items={layersSorted}
        onSortEnd={this.onSortEnd}
        selectedId={currentComId}
        deleteCom={deleteCom}
        targetPageId={targetPageId}
      />
    )
  }
}

export default Layers
