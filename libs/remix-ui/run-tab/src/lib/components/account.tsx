// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { CopyToClipboard } from '@remix-ui/clipboard'
import { AccountProps } from '../types'

export function AccountUI (props: AccountProps) {
  const { selectedAccount, loadedAccounts } = props.accounts
  const accounts = Object.keys(loadedAccounts)
  const [plusOpt, setPlusOpt] = useState({
    classList: '',
    title: ''
  })

  useEffect(() => {
    if (!selectedAccount && accounts.length > 0) props.setAccount(accounts[0])
  }, [accounts, selectedAccount])

  useEffect(() => {
    switch (props.selectExEnv) {
      case 'injected':
        setPlusOpt({
          classList: 'udapp_disableMouseEvents',
          title: "Unfortunately it's not possible to create an account using injected web3. Please create the account directly from your provider (i.e metamask or other of the same type)."
        })
        break

      case 'vm':
        setPlusOpt({
          classList: '',
          title: 'Create a new account'
        })
        break

      case 'web3':
        if (!props.personalMode) {
          setPlusOpt({
            classList: 'disableMouseEvents',
            title: 'Creating an account is possible only in Personal mode. Please go to Settings to enable it.'
          })
        } else {
          setPlusOpt({
            classList: '',
            title: 'Create a new account'
          })
        }
        break

      default:
        setPlusOpt({
          classList: 'disableMouseEvents',
          title: `Unfortunately it's not possible to create an account using an external wallet (${props.selectExEnv}).`
        })
    }
    // this._deps.config.get('settings/personal-mode')
  }, [props.selectExEnv, props.personalMode])

  const newAccount = () => {
    props.createNewBlockchainAccount(passphrasePrompt())
  }

  const signMessage = () => {
    // dispatch signMessageWithBlockchainAccounts
  //   this.blockchain.getAccounts((err, accounts) => {
  //     if (err) {
  //       return addTooltip(`Cannot get account list: ${err}`)
  //     }

    //     var signMessageDialog = { title: 'Sign a message', text: 'Enter a message to sign', inputvalue: 'Message to sign' }
    //     var $txOrigin = this.el.querySelector('#txorigin')
    //     if (!$txOrigin.selectedOptions[0] && (this.blockchain.isInjectedWeb3() || this.blockchain.isWeb3Provider())) {
    //       return addTooltip('Account list is empty, please make sure the current provider is properly connected to remix')
    //     }

    //     var account = $txOrigin.selectedOptions[0].value

    //     var promptCb = (passphrase) => {
    //       const modal = modalDialogCustom.promptMulti(signMessageDialog, (message) => {
    //         this.blockchain.signMessage(message, account, passphrase, (err, msgHash, signedData) => {
    //           if (err) {
    //             return addTooltip(err)
    //           }
    //           modal.hide()
    //           modalDialogCustom.alert(yo`
    //             <div>
    //               <b>hash:</b><br>
    //               <span id="remixRunSignMsgHash" data-id="settingsRemixRunSignMsgHash">${msgHash}</span>
    //               <br><b>signature:</b><br>
    //               <span id="remixRunSignMsgSignature" data-id="settingsRemixRunSignMsgSignature">${signedData}</span>
    //             </div>
    //           `)
    //         })
    //       }, false)
    //     }

  //     if (this.blockchain.isWeb3Provider()) {
  //       return modalDialogCustom.promptPassphrase(
  //         'Passphrase to sign a message',
  //         'Enter your passphrase for this account to sign the message',
  //         '',
  //         promptCb,
  //         false
  //       )
  //     }
  //     promptCb()
  //   })
  }

  const handlePassphrase = (e) => {
    props.setPassphrase(e.target.value)
  }

  const handleMatchPassphrase = (e) => {
    props.setMatchPassphrase(e.target.value)
  }

  const passphrasePrompt = () => {
    return (
      <div> Please provide a Passphrase for the account creation
        <div>
          <input id="prompt1" type="password" name='prompt_text' style={{ width: '100%' }} onInput={handlePassphrase} />
          <br />
          <br />
          <input id="prompt2" type="password" name='prompt_text' style={{ width: '100%' }} onInput={handleMatchPassphrase} />
        </div>
      </div>
    )
  }

  return (
    <div className="udapp_crow">
      <label className="udapp_settingsLabel">
        Account
        <span id="remixRunPlusWraper" title={plusOpt.title}>
          <i id="remixRunPlus" className={`fas fa-plus-circle udapp_icon ${plusOpt.classList}`} aria-hidden="true" onClick={newAccount}></i>
        </span>
      </label>
      <div className="udapp_account">
        <select id="txorigin" data-id="runTabSelectAccount" name="txorigin" className="form-control udapp_select custom-select pr-4" value={selectedAccount} onChange={(e) => { props.setAccount(e.target.value) }}>
          {
            Object.keys(loadedAccounts).map((value, index) => <option value={value} key={index}>{ loadedAccounts[value] }</option>)
          }
        </select>
        <div style={{ marginLeft: -5 }}><CopyToClipboard content={selectedAccount} direction='top' /></div>
        <i id="remixRunSignMsg" data-id="settingsRemixRunSignMsg" className="mx-1 fas fa-edit udapp_icon" aria-hidden="true" onClick={signMessage} title="Sign a message using this account key"></i>
      </div>
    </div>
  )
}