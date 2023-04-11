import video from './assets/BabyShower-higherquality.mp4'
import RsvpForm from './RsvpForm'

const Video = (): JSX.Element => {
  return (
    <div className="h-screen w-screen absolute top-0 right-0 left-0 bottom-0 bg-[#2B6065]">
      <div className="relative">
        <video playsInline autoPlay loop muted className="w-full h-full">
          <source src={video} type="video/mp4" />
        </video>
        <div className="z-20 flex items-center object-bottom inset-x-0 bottom-0 p-5 rounded-md bg-[#2B6065]">
          <RsvpForm />
        </div>
      </div>
    </div>
  )
}
export default Video
