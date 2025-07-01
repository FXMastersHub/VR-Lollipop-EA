import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ageData, setAgeData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const calculateAge = () => {
    const today = new Date();
    
    if (birthDate >= today) {
      Alert.alert('Invalid Date', 'Birth date cannot be in the future!');
      return;
    }

    const ageInfo = getDetailedAge(birthDate, today);
    setAgeData(ageInfo);
    setShowResults(true);
  };

  const getDetailedAge = (birthDate, currentDate) => {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const timeDiff = currentDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    const totalHours = Math.floor(timeDiff / (1000 * 3600));
    const totalMinutes = Math.floor(timeDiff / (1000 * 60));
    const totalSeconds = Math.floor(timeDiff / 1000);

    const nextBirthday = getNextBirthday(birthDate, currentDate);
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

    const dayOfWeekBorn = getDayOfWeek(birthDate);

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      nextBirthday,
      daysUntilBirthday,
      dayOfWeekBorn,
    };
  };

  const getNextBirthday = (birthDate, currentDate) => {
    const nextBirthday = new Date(
      currentDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (nextBirthday <= currentDate) {
      nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }

    return nextBirthday;
  };

  const getDayOfWeek = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const resetCalculator = () => {
    setShowResults(false);
    setAgeData(null);
    setBirthDate(new Date());
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <FontAwesome5 name="birthday-cake" size={40} color="white" />
          <Text style={styles.headerTitle}>Age Calculator</Text>
          <Text style={styles.headerSubtitle}>Discover your life statistics</Text>
        </Animatable.View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="fadeInUp" duration={1000} delay={300}>
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Select Your Birth Date</Text>
            
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="date-range" size={24} color="#667eea" />
              <Text style={styles.dateButtonText}>
                {formatDate(birthDate)}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#667eea" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}

            <TouchableOpacity style={styles.calculateButton} onPress={calculateAge}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
              >
                <MaterialIcons name="calculate" size={24} color="white" />
                <Text style={styles.calculateButtonText}>Calculate My Age</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {showResults && ageData && (
          <Animatable.View animation="fadeInUp" duration={800} delay={200}>
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Your Age Details</Text>
                <TouchableOpacity onPress={resetCalculator} style={styles.resetButton}>
                  <MaterialIcons name="refresh" size={20} color="#667eea" />
                </TouchableOpacity>
              </View>

              <View style={styles.ageGrid}>
                <Animatable.View animation="bounceIn" delay={400} style={styles.ageCard}>
                  <Text style={styles.ageNumber}>{ageData.years}</Text>
                  <Text style={styles.ageLabel}>Years</Text>
                </Animatable.View>
                
                <Animatable.View animation="bounceIn" delay={600} style={styles.ageCard}>
                  <Text style={styles.ageNumber}>{ageData.months}</Text>
                  <Text style={styles.ageLabel}>Months</Text>
                </Animatable.View>
                
                <Animatable.View animation="bounceIn" delay={800} style={styles.ageCard}>
                  <Text style={styles.ageNumber}>{ageData.days}</Text>
                  <Text style={styles.ageLabel}>Days</Text>
                </Animatable.View>
              </View>

              <Animatable.View animation="fadeInUp" delay={1000}>
                <View style={styles.detailsSection}>
                  <Text style={styles.detailsTitle}>Life Statistics</Text>
                  
                  <View style={styles.statGrid}>
                    <View style={styles.statItem}>
                      <MaterialIcons name="today" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Total Days</Text>
                        <Text style={styles.statValue}>{formatNumber(ageData.totalDays)}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <MaterialIcons name="access-time" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Total Hours</Text>
                        <Text style={styles.statValue}>{formatNumber(ageData.totalHours)}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <MaterialIcons name="timer" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Total Minutes</Text>
                        <Text style={styles.statValue}>{formatNumber(ageData.totalMinutes)}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <FontAwesome5 name="heartbeat" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Heartbeats (Est.)</Text>
                        <Text style={styles.statValue}>{formatNumber(Math.floor(ageData.totalMinutes * 75))}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <MaterialIcons name="cake" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Next Birthday</Text>
                        <Text style={styles.statValue}>{formatDate(ageData.nextBirthday)}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <MaterialIcons name="event" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Days Until Birthday</Text>
                        <Text style={styles.statValue}>{ageData.daysUntilBirthday}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <MaterialIcons name="calendar-today" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Born on</Text>
                        <Text style={styles.statValue}>{ageData.dayOfWeekBorn}</Text>
                      </View>
                    </View>

                    <View style={styles.statItem}>
                      <FontAwesome5 name="globe" size={20} color="#667eea" />
                      <View style={styles.statContent}>
                        <Text style={styles.statLabel}>Earth Rotations</Text>
                        <Text style={styles.statValue}>{formatNumber(ageData.totalDays)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Animatable.View>
            </View>
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  calculateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultsSection: {
    marginBottom: 30,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ageGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  ageCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  ageNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  ageLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  detailsSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statGrid: {
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statContent: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    color: '#667eea',
    fontWeight: 'bold',
  },
});
