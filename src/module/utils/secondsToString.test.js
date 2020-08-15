import secondsToString from './secondsToString.js'
import { ExpansionPanelActions } from '@material-ui/core'

test('seconds to string', () =>{

    let seconds = 600
    let string = secondsToString(seconds);

    expect(string).toEqual('10:00')
})