import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native'

import {Button} from '../components/Button'
import {SkillCard} from '../components/SkillCard'

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState([
    'Node',
    'React',
    'React Native',
    'JavaScript',
    'CSS',
    'HTML',
    'TypeScript',
    'Styled Components',
  ])

  function handleNewAddNewSkill() {
    if (newSkill === '') {
      return
    }
    setMySkills((oldState) => [...oldState, newSkill])
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Paulo Barros</Text>

        <TextInput
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button onPress={handleNewAddNewSkill} label="Add" />

        <Text style={[styles.title, styles.titleSkills]}>My Skills</Text>

        <FlatList
          data={mySkills}
          keyExtractor={(item) => item}
          renderItem={({item}) => <SkillCard skill={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7,
  },
  titleSkills: {
    marginVertical: 50,
  },
})
