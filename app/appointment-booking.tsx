import React,{useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Modal,FlatList,ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons"; 


export default function AppointmentBooking() {

    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showTimeModal, setShowTimeModal] = useState(false);
  const router = useRouter();
  const [selectedArea, setSelectedArea] = useState("");

  const handlesave=()=>{
    router.push("/safety-briefing");
  }

  const onDateSelect = (day:any) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); }

 // Suggested times
 const timeSlots = [
    { start: '9:00 AM', end: '10:00 AM' },
    { start: '10:00 AM', end: '11:00 AM' },
    { start: '11:00 AM', end: '12:00 PM' },
    { start: '1:00 PM', end: '2:00 PM' },
    { start: '2:00 PM', end: '3:00 PM' },
  ];

  const handleGoBack = () => {
    router.push("./upload"); // Navigate back to the home page or another route
  };

  return (
    <View style={styles.maincontainer}>
        <View style={styles.titleContainer}>
            <View style={styles.titleIcon}>
            <Icon name="arrow-back" size={22} style={styles.backIcon} onPress={handleGoBack} />
            </View>
            <Text style={styles.title}>Appointment Booking</Text>
        </View>
        <View style={styles.subContainer}>
        <ScrollView style={styles.Flatcontainer} contentContainerStyle={styles.scrollViewContent}>
            
                <Text style={styles.Flattitle}>Appointment Booking</Text>
                <View style={styles.flatsubcontainer}>
                    <TextInput placeholder="Person to Meet" style={styles.input} />
                    <TextInput placeholder="Department" style={styles.input} />
                    <View style={styles.pickerviw}>
                        <Picker
                        selectedValue={selectedArea}
                        style={[styles.input,styles.pickerip]}
                        onValueChange={(itemValue:any) => setSelectedArea(itemValue)}
                        >
                        <Picker.Item  label="Select Visit Area" value="" />
                        <Picker.Item label="Reception" value="Reception" />
                        <Picker.Item label="HR Department" value="HR" />
                        <Picker.Item label="Finance" value="Finance" />
                        {/* Add more areas as needed */}
                        </Picker>
                    </View>
                    <TextInput placeholder="Purpose to Meet" style={styles.input} />
                    <View style={styles.row}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Date"
                            value={selectedDate}
                            style={[styles.input, styles.rowInput]}
                            editable={false} // Make the input non-editable
                        />
                        <TouchableOpacity onPress={() => setShowCalendar(true)}>
                            <Icon name="calendar-today" size={24} color="#1A5CFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Time"
                            value={selectedTime}
                            style={[styles.input, styles.rowInput]}
                            editable={false} // Make the input non-editable
                        />
                        <TouchableOpacity style={styles.icons} onPress={() => setShowTimeModal(true)}>
                            <Icon name="access-time" size={24} color="#1A5CFF" />
                        </TouchableOpacity>
                    </View>                    
                    </View>
                </View>
                
                <View style={styles.secondaryContainer}>
                    <View style={styles.SecTitleContainer}>
                     <Text style={styles.secTitle}>Items carry with you</Text>
                     <Text style={styles.addmore}>+ Add more</Text>    
                    </View>  
                    <View style={styles.itemcarry}>
                    <View style={styles.pickerviw}>
                        <Picker
                        selectedValue={selectedArea}
                        style={[styles.input,styles.pickerip]}
                        onValueChange={(itemValue:any) => setSelectedArea(itemValue)}
                        >
                        <Picker.Item  label="Select Item" value="" />
                        <Picker.Item  label="Mobile Phone" value="" />
                        <Picker.Item label="Tablets" value="Reception" />
                        <Picker.Item label="Laptop" value="HR" />
                        {/* Add more areas as needed */}
                        </Picker>
                    </View>    
                    <TextInput placeholder="Additional Details" style={styles.input} />
                    </View>               
                </View>

                <View style={styles.secondaryContainer}>
                    <View style={styles.SecTitleContainer}>
                     <Text style={styles.secTitle}>Co-Visitors</Text>
                     <Text style={styles.addmore}>+ Add more</Text>    
                    </View>  
                    <View style={styles.itemcarry}>
                     
                    <TextInput placeholder="Name of Person" style={styles.input} />
                    <TextInput placeholder="Email Id" style={styles.input} />
                    <TextInput placeholder="Phone Number" style={styles.input} />
                    </View>               
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.captureButton}  onPress={handlesave}>
                  <Text style={styles.ConfirmbuttonText}>Save & Next</Text>
                </TouchableOpacity>
                </View>
            
        </ScrollView>
        </View>

        {/* Calendar Modal */}
      {showCalendar && (
        <Modal transparent={true} visible={showCalendar} animationType="slide">
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={onDateSelect}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: '#1A5CFF', selectedTextColor: 'white' },
              }}
              markingType={'simple'}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCalendar(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Time Slots Modal */}
      {showTimeModal && (
        <Modal transparent={true} visible={showTimeModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.timeSlotTitle}>Select a Time Slot</Text>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={styles.timeSlotItem}
                onPress={() => {
                  setSelectedTime(`${slot.start} - ${slot.end}`);
                  setShowTimeModal(false); // Close modal after selection
                }}
              >
                <Text style={styles.timeSlotText}>{`${slot.start} - ${slot.end}`}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowTimeModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>

    
  );
}

const styles = StyleSheet.create({
    maincontainer:{
        
    },
    scrollViewContent: {
        flexGrow: 1, // Ensure content can grow and scroll
        paddingBottom: 20, // Add some bottom padding to scroll comfortably
      },
    titleContainer:{
    width: "100%", // Fill width (equivalent to 393px for most devices)
    maxWidth: 393, // Optional: ensure it doesn’t exceed 393px
    height: 64, // Fixed height
    padding: 12, // var(--SpacingSpacing-sm12) assumed as 12px
    gap: 12, // React Native doesn’t support `gap` directly, but use `margin` or `padding` between child elements
    flexDirection: "row", // Use flexbox for gap-like behavior between child elements
    alignItems: "center",
    },
    titleIcon:{
    width: 56, // Hug width (fixed to 56px)
    height: 40, // Fixed height
    paddingVertical: 8, // var(--SpacingSpacing-xs8) assumed as 8px for top and bottom
    paddingHorizontal: 16, // var(--SpacingSpacing-md16) assumed as 16px for left and right
    borderRadius: 360, // var(--RadiusRadius-full360) for fully rounded corners
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    gap: 12, // React Native doesn’t support `gap`, use margin or padding between child elements if needed
    },
    backIcon:{
    
    position: "absolute", // Required for `top` and `left`
    top: 7.25, // Position from the top: 7.25px
    left: 3.25, // Position from the left: 3.25px
    gap: 0,
  },
  subContainer:{
    width: 369, // Fixed width: 369px
    height: 622, // Fixed height: 622px
    paddingVertical: 32, // Padding: 32px for top and bottom
    paddingHorizontal: 12, // Padding: 12px for left and right
    gap: 20, // React Native doesn’t support `gap`, so use margin or padding for spacing between children
    borderRadius: 32, // Border radius for the top-left corner
    backgroundColor: "#FAFAFA", // Background color
    borderWidth:1,
    borderColor:"#EBEBE6",
  },
    Flatcontainer: {
      width: 369, // Fixed width: 369px
      height: 566,
      gap:30,
      
  },
 
  title: {
    width: 241, // Fixed width: 241px
    height: 28, // Fixed height: 28px
    fontFamily: "DM_Sans", // Font family
    fontSize: 20, // Font size: 20px
    fontWeight: "500", // Font weight: 500
    lineHeight: 28, // Line height: 28px
    letterSpacing: 0.02, // Letter spacing: 0.02em
    textAlign: "center", // Text alignment: center
    color: "#292927", // Background color treated as text color
    left:-26,
  },
  Flattitle:{
    width: 166, // Fixed width in pixels
    height: 24, // Fixed height in pixels
    fontFamily: "DM_Sans", // Font family
    fontSize: 16, // Font size in pixels
    fontWeight: "600", // Font weight (semi-bold)
    lineHeight: 24, // Line height in pixels
    letterSpacing: 0.02, // Letter spacing
    textAlign: "center", // Text alignment to the left
    color: "#1A5CFF", // Background color
  },
  flatsubcontainer:{
    width: 345, // Fixed width in pixels
    height: 376, // Use 'auto' to let the height hug its content
    paddingVertical: 8, // Padding top and bottom (8px)
    paddingHorizontal: 0, // No padding on left and right
    gap: 20, // Space between child elements (use margin on child elements for this effect)
  },
  secondaryContainer:{
    width: 345, // Fixed width
    height: 'auto', // Hug height (fixed)
    paddingVertical: 8, // Top and bottom padding 8px
    paddingHorizontal: 0,
    gap: 20,
    marginTop:30
  },
  SecTitleContainer:{
    width: 345, // Fixed width of 345px
    height: 30, // Fixed height of 30px
    paddingVertical: 0, // No padding on top and bottom
    paddingHorizontal: 8, // 8px padding on left and right
    flexDirection: 'row', // Align children in a row (default)
    justifyContent: 'space-between',
  },
  secTitle:{
    fontFamily: 'DM_Sans', // Custom font family
    fontSize: 20, // Font size of 20px
    fontWeight: '600', // Semi-bold font weight
    letterSpacing: 0.02, // Letter spacing of 0.02em
    textAlign: 'left',
  },
  itemcarry:{
    gap:20,
  },
  buttonContainer:{
    width: 329, // Fixed width
    justifyContent:'center',
    alignItems:'center',
    marginTop:20,
  },
  captureButton: {
    width: 305,
    height: 56,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 360,
    backgroundColor: "#1A5CFF",
    justifyContent: "center",
    alignItems: "center",
  },
  ConfirmbuttonText: {
    fontFamily: "DM_Sans",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: -0.025,
    color: "#FFFFFF",
  },

  addmore:{
    fontFamily: 'DM_Sans', // Custom font family
    fontSize: 17, // Font size of 14px
    fontWeight: '600', // Semi-bold font weight
    letterSpacing: 0.02, // Letter spacing of 0.02em
    width: 98, // Width of 68px
    gap: 0,
    color:'#1A5CFF'
  },
  input:{
    fontFamily:"DM_Sans",
    fontSize:12,    
    width: 323, // Fixed width in logical pixels
    height: 56, // Fixed height in logical pixels
    padding: 16, // Replace with your actual spacing value (assuming 16px)
    gap: 16, // React Native does not support `gap`, but this could be used for spacing between child components via margin
    borderRadius: 16, // Border radius (replace with your actual radius value)
    borderWidth:1,
    borderColor: '#EBEBE6', // Top border color
    backgroundColor: '#FFFFFF', 
  },
  pickerviw:{
    width: 323, // Fixed width in logical pixels
    height: 56,
    borderRadius: 16,
    borderWidth:1,
    borderColor: '#EBEBE6',
    backgroundColor:'transparent'


  },
  pickerip:{
    fontFamily:"DM_Sans",
    borderWidth:1,
    borderColor: '#EBEBE6',
    borderRadius: 16,
    backgroundColor:'transparent',
    color:'#9c9c9c'// gray#9c9c9c,


  },
  row: {
    width: 323, // Fixed width in logical pixels
    height: 56,
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between', // Space between the items
    gap: 12, // Optional: This can create space between the two inputs
  },
  rowInput: {
    width: '48%',
    borderWidth:0,
    textAlign:'left',
    left:-11,
    backgroundColor:'transparent'
},
icons:{
    
},
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#292927",
    marginBottom: 40,
    textAlign: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "#1A5CFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    borderWidth:1,
    borderRadius:14,
    justifyContent:'space-around',
    borderColor: '#EBEBE6', // Top border color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: '#1A5CFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  timeSlotTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1A5CFF',
    marginBottom: 10,
  },
  timeSlotItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 250,
    alignItems: 'center',
  },
  timeSlotText: {
    fontSize: 16,
    color: '#292927',
  },
});
