import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const RsvpForm = () => {
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [email, setEmail] = useState('')
  const [rsvp, setRSVP] = useState(true)

  const submit = useCallback(() => {
    console.log(fname, lname, email, rsvp)
    axios
      .post(`/rsvps`, {
        first_name: fname,
        last_name: lname,
        email,
        rsvp,
      })
      .then((res) => {
        const success = res.data.msg.includes('Success')
        console.log(res.data)
        const msg = success
          ? rsvp
            ? `Glad you can make it, ${fname} - see you soon!`
            : 'Thanks for the RSVP.'
          : res.data.msg
        toast.success(msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
          icon: '🌟',
          className: 'bg-[#0FB367] text-white',
        })
      })

    setFName('')
    setLName('')
    setEmail('')
  }, [email, fname, lname, rsvp])

  return (
    <form
      className="flex flex-wrap gap-4 ontent-center text-lg m-auto"
      onSubmit={(ev) => {
        ev.preventDefault()
        submit()
      }}
    >
      <input
        className="pl-2 opacity-100 rounded-sm bg-transparent border-b-2 border-[#09323D]"
        value={fname}
        name="fname"
        type="text"
        placeholder="first name"
        onChange={(ev) => setFName(ev.target.value)}
      />

      <input
        className="pl-2 opacity-100 rounded-sm bg-transparent border-b-2 border-[#09323D]"
        value={lname}
        name="lname"
        type="text"
        placeholder="last name"
        onChange={(ev) => setLName(ev.target.value)}
      />

      <input
        className="pl-2 opacity-100 rounded-sm bg-transparent border-b-2 border-[#09323D]"
        value={email}
        type="text"
        placeholder="email"
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <div className="flex flex-col flex-nowrap items-start">
        <div>
          <input
            className="m-1"
            name="rsvp-yes"
            type="radio"
            value="yes"
            onChange={() => setRSVP(true)}
            checked={rsvp}
          />
          happily accept
        </div>
        <div>
          <input
            className="m-1"
            name="rsvp-no"
            type="radio"
            value="no"
            onChange={() => setRSVP(false)}
            checked={!rsvp}
          />
          regretfully decline
        </div>
      </div>
      <button
        className="rounded-full text-white bg-[#09323D] font-semibold disabled:opacity-50 disabled:pointer-events-none"
        type="submit"
        disabled={[fname, lname, email].includes('')}
        onSubmit={(ev) => {
          console.log(`hi ${fname}`)
          ev.preventDefault()
        }}
      >
        rsvp!
      </button>
    </form>
  )
}

export default RsvpForm
