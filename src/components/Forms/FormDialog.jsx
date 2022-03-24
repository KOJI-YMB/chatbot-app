import React, {useState, useCallback} from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextInput from './TextInput'

const FormDialog = () => {
    const [name, setName] =  useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])

  const validateEmailFormat = (email) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
  }

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            isBlank = true;
        }
    }
    return isBlank
  };

  const submitForm =() => {
    const isBlank = validateRequiredInput(name, email, description)
    const isValidEmail = validateEmailFormat(email)

    if (isBlank) {
      alert('必須入力欄が空白です。')
      return false
    } else if (!isValidEmail) {
      alert('メールアドレスの書式が異なります。')
      return false
    } else {
      const payload = {
        text: 'お問い合わせがありました\n'
            + '名前：' + name + '\n'
            + 'メールアドレス' + email + '\n'
            + '【問い合わせ内容】\n' + description
      };

      const WEBHOOK_URL = ''

      fetch(WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(() => {
        alert('送信が完了しました。');
        setName("")
        setEmail("")
        setDescription("")
        return props.handleClose()
      })
    }
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      お問い合わせフォーム
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <TextInput
          label={"お名前(必須)"} multiline={false} rows={1}
          value={state.name} type={"text"} onChange={inputName}
        />
        <TextInput
          label={"メールアドレス(必須)"} multiline={false} rows={1}
          value={state.email} type={"email"} onChange={inputEmail}
        />
        <TextInput
          label={"お問い合わせ内容(必須)"} multiline={true} rows={5}
          value={state.description} type={"text"} onChange={inputDescription}
        />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose}>キャンセル</Button>
      <Button onClick={submitForm} autoFocus>送信する</Button>
    </DialogActions>
  </Dialog>
  )
}
export default FormDialog;
