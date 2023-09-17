import time

import adhawkapi
import adhawkapi.frontend
import pyautogui

yRate = 220
xRate = 300
ignoreMove = 20
prevX = 960
prevY = 540


class FrontendData:
    prevX = 960
    prevY = 540
    blinkCount = 0
    timeCtr = 0
    eyeWasClosed = False
    eyeWasOpen = True
    quadrant = 5
    
    ''' BLE Frontend '''

    def __init__(self):
 
        # TODO: Update the device name to match your device
        # Instantiate an API object
        self._api = adhawkapi.frontend.FrontendApi(ble_device_name='ADHAWK MINDLINK-277')

        # Tell the api that we wish to receive eye tracking data stream
        # with self._handle_et_data as the handler
        self._api.register_stream_handler(adhawkapi.PacketType.EYETRACKING_STREAM, self._handle_et_data)

        # Tell the api that we wish to tap into the EVENTS stream
        # with self._handle_events as the handler
        self._api.register_stream_handler(adhawkapi.PacketType.EVENTS, self._handle_events)

        # Start the api and set its connection callback to self._handle_tracker_connect/disconnect.
        # When the api detects a connection to a MindLink, this function will be run.
        self._api.start(tracker_connect_cb=self._handle_tracker_connect,
                        tracker_disconnect_cb=self._handle_tracker_disconnect)

    def shutdown(self):
        '''Shutdown the api and terminate the bluetooth connection'''
        self._api.shutdown()
        
    @staticmethod
    def _handle_et_data(et_data: adhawkapi.EyeTrackingStreamData):
        ''' Handles the latest et data '''
        if et_data.gaze is not None:
            xvec, yvec, zvec, vergence = et_data.gaze
            print(f'Gaze={xvec:.2f},y={yvec:.2f},z={zvec:.2f},vergence={vergence:.2f}')
            #if abs(FrontendData.prevX - xvec) > ignoreMove/320 or abs(FrontendData.prevY - yvec) > ignoreMove/180:
            #pyautogui.moveTo(int((xvec+5.6)*xRate), int((-1*yvec+5)*yRate), 0.015)
            #FrontendData.prevY = yvec
            #FrontendData.prevX = xvec
            
            #time1 = round(time.time() * 1000)
            #while (round(time.time() * 1000) - time1) < 15:
            
            if (FrontendData.quadrant == 1 or FrontendData.quadrant == 2) and xvec < 2:
                pyautogui.keyUp('up')
            elif (FrontendData.quadrant == 3 or FrontendData.quadrant == 4) and xvec > 2:
                pyautogui.keyUp('down')
            
            if (FrontendData.quadrant == 1 or FrontendData.quadrant == 4) and yvec < -2:
                pyautogui.keyUp('right')
            elif (FrontendData.quadrant == 2 or FrontendData.quadrant == 3) and yvec > -2:
                pyautogui.keyUp('left')
                
            if (yvec > 0 and xvec > 0):
                pyautogui.keyDown('up')
                pyautogui.keyDown('right')               
            elif (yvec > 0 and xvec < 0):              
                pyautogui.keyDown('up')
                pyautogui.keyDown('left')   
            elif (yvec < 0 and xvec < 0):              
                pyautogui.keyDown('down')
                pyautogui.keyDown('left') 
            else:             
                pyautogui.keyDown('down')
                pyautogui.keyDown('right') 
             
               
        if et_data.eye_center is not None:
            if et_data.eye_mask == adhawkapi.EyeMask.BINOCULAR:
                rxvec, ryvec, rzvec, lxvec, lyvec, lzvec = et_data.eye_center
                #print(f'Eye center: Left=(x={lxvec:.2f},y={lyvec:.2f},z={lzvec:.2f}) '
                #      f'Right=(x={rxvec:.2f},y={ryvec:.2f},z={rzvec:.2f})')

        if et_data.pupil_diameter is not None:
            if et_data.eye_mask == adhawkapi.EyeMask.BINOCULAR:
                rdiameter, ldiameter = et_data.pupil_diameter
                #print(f'Pupil diameter: Left={ldiameter:.2f} Right={rdiameter:.2f}')

        if et_data.imu_quaternion is not None:
            if et_data.eye_mask == adhawkapi.EyeMask.BINOCULAR:
                x, y, z, w = et_data.imu_quaternion
                #print(f'IMU: x={x:.2f},y={y:.2f},z={z:.2f},w={w:.2f}')

    @staticmethod
    def _handle_events(event_type, timestamp, *args):
        if event_type == adhawkapi.Events.BLINK:
            duration = args[0]
            #FrontendData.blinkCount += 1
            #if int(round(time.time() * 1000)) - FrontendData.timeCtr < 1000: #and FrontendData.blinkCount == 2:
                #FrontendData.blinkCount = 0
            # while True:
                # pyautogui.press('down') 
                #pyautogui.click() 
            #FrontendData.timeCtr = int(round(time.time() * 1000))
            
            #print(f'Got blink: {timestamp} {duration}')
        if event_type == adhawkapi.Events.EYE_CLOSED:
            #eyeWasClosed = True
            eye_idx = args[0]
            #print(f'Eye Close: {timestamp} {eye_idx}')
        if event_type == adhawkapi.Events.EYE_OPENED:
            # eyeWasOpened = True
            # if (eyeWasClosed == True and eyeWasOpened == True):
                # eyeWasClosed = False
                # print("BLINK SEQUNENCE")
            eye_idx = args[0]
            #print(f'Eye Open: {timestamp} {eye_idx}')

    def _handle_tracker_connect(self):
        #print("Tracker connected")
        self._api.set_et_stream_rate(60, callback=lambda *args: None)

        self._api.set_et_stream_control([
            adhawkapi.EyeTrackingStreamTypes.GAZE,
            adhawkapi.EyeTrackingStreamTypes.EYE_CENTER,
            adhawkapi.EyeTrackingStreamTypes.PUPIL_DIAMETER,
            adhawkapi.EyeTrackingStreamTypes.IMU_QUATERNION,
        ], True, callback=lambda *args: None)

        self._api.set_event_control(adhawkapi.EventControlBit.BLINK, 1, callback=lambda *args: None)
        self._api.set_event_control(adhawkapi.EventControlBit.EYE_CLOSE_OPEN, 1, callback=lambda *args: None)

    def _handle_tracker_disconnect(self):
        print("Tracker disconnected")
        



def main():
    ''' App entrypoint '''
    pyautogui.FAILSAFE = False
    frontend = FrontendData()
    try:
        while True:
            time.sleep(1)
    except (KeyboardInterrupt, SystemExit):
        frontend.shutdown()

if __name__ == '__main__':
    main()