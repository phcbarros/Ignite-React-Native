import React, {useRef, useState} from 'react'
import {FlatList, ViewToken} from 'react-native'

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles'

interface Props {
  imagesUrl: string[]
}

interface ChangeImageProps {
  viewableItems: ViewToken[]
  changed: ViewToken[]
}

export function ImageSlider({imagesUrl}: Props) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const indexChangedRef = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!
    setSelectedImageIndex(index)
  })

  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((_, index) => (
          <ImageIndex key={index} active={index === selectedImageIndex} />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item}
        renderItem={({item}) => (
          <CarImageWrapper>
            <CarImage source={{uri: item}} resizeMode="contain" />
          </CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChangedRef.current}
        pagingEnabled
      />
    </Container>
  )
}
