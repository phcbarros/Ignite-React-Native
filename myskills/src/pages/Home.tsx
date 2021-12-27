import React, {useEffect, useState} from 'react'
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

interface SkillData {
  id: string
  name: string
}

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<Array<SkillData>>([])
  const [greeting, setGreeting] = useState('')

  function handleNewAddNewSkill() {
    if (newSkill === '') {
      return
    }
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }
    setMySkills((oldState) => [...oldState, data])
  }

  useEffect(() => {
    const currentHour = new Date().getHours()

    if (currentHour < 12) {
      setGreeting('Good morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Paulo Barros</Text>
        <Text style={styles.greetings}>{greeting}</Text>

        <TextInput
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button title="Add" onPress={handleNewAddNewSkill} />

        <Text style={[styles.title, styles.titleSkills]}>My Skills</Text>

        <FlatList
          data={mySkills}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <SkillCard skill={item.name} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121015',
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
  greetings: {
    color: '#fff',
  },
})
