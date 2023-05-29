import React, { useEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import Icon from "./Icon";
import { Card, Select } from "components/ui";
import { Bars, ThreeDots } from "react-loader-spinner";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import { BsMic } from "react-icons/bs";
import StartWork1 from "./StartWork1";
import StarWork2 from "./StarWork2";
import Gift from "./Gift";
import Student from "./Student";
import ReadMore from "./ReadMore";
import axios from "axios";
import { chat_Type } from "constants/constants";
import MicRecorder from "mic-recorder-to-mp3";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const startQuestions = [
  {
    label: " Who Ate All That Up",
    value: `Nothing goes to waste in a forest.  Nothing at all!  Everything gets cleaned up.  Absolutely everything!
      When leopards don’t finish their food, Who eats the rest?   The vultures and the hyenas!
      And the hungry wild boar.   GRUNT! GRUNT!
      When the vultures and the hyenas waste their food, Who gobbles it up?   The flies and the maggots!
      And the hungry wild boar.   GRUNT! GRUNT!
      When elephants poop in the forest, Who snacks on that?   The dung beetles!
      And the hungry wild boar.   GRUNT! GRUNT!
      When branches, leaves, and rain fall on the ground, Who feasts on it all?   The termites and the fungi!
      And the hungry wild boar.   GRUNT! GRUNT!
      When the air gets dirty with smoke, Who sucks it all in?   The trees!
      Ummm, but not the hungry wild boar.   GRUNT! GRUNT!`,
  },
  {
    label: "Ann-Nem-Oh-Nee finds Adventure",
    value: `Ann-Nem-Oh-Nee lived in the ocean. All day long she clung to the same slippery rock with her single big foot. Her tiny tentacles caught tasty treats. On days when she felt cross, her stinging tentacles kept the other creatures away. But today her rock felt lonely.
      “I have no fins. I am different to every other creature.”   I have no feet. “Even that hermit crab is off having adventures!” “Save me! That fish wants to pluck me out of my shell!” Ann-Nem-Oh-Nee whipped up her stinging tentacles and hid the hermit underneath them.   “Go away, you big bully!” The big fish bared his teeth, but was afraid of being stung. He gave up and swam away with a cheeky flick of his tail. “That was close!” said the crab. “Is it safe now?”   “You can come out, Crab. What’s your name?” “Herman. I’m a hermit, but I think I need a bodyguard. I wish I was as brave as you!” “I’m Ann-Nem-Oh-Nee. I wish I had amazing adventures like you.” “But why don’t you?” He asked. “I’m stuck to my rock. And I don’t have legs!” She replied. “Well, I don’t have stings, but I do have an idea!” Herman took Ann-Nem-Oh-Nee by the tentacle and danced around her, pulling silly faces. First Ann-Nem-Oh-Nee snorted, and then she giggled — and then she laughed so hard she popped right off her rock. Herman gently picked her up and settled her on his shell. “Are you ready? I feel an adventure coming on.” He said. Ann-Nem-Oh-Nee adventures all over the ocean, catching tasty treats. Now she only uses her stinging tentacles to keep the nasty fish away from Herman. And she never, ever feels lonely.`,
  },
  {
    label: "Fat King Thin Dog",
    value: `This is a fat king.
    The fat king has a thin dog.   The fat king and his thin dog go for a walk.
    The dog sees a bird.   The dog runs after the bird.
    The king runs after the dog.
    They run and run.   They run and run for many days.
    The king catches the dog.
    Now the fat king is thin.`,
  },
  {
    label: "Feathered Friends",
    value: `We are the oakum boys.   We do everything together.
    Penguins don’t fly, they swim.   But we’re too young to swim.   So we walk.
    One day we went for a long walk.   We walked and walked.  Until we saw something new.
    He’s got something on his head!
    You’re changing!  So are you!
    It’s not so bad!   It’s not so cold!
    But who’s going to teach us to swim?   I will!`,
  },
  {
    label: "hello",
    value: `My name is Lolo.   I have many friends. Come out with me to say hello!
    Hello Sun,  big and bright.   You fill the day with your bright light.
    Hello Grass,  soft and green. You give us all a place to play.
    Hello Sky,  broad and blue.   You fill the sky with the color blue.
    Hello Moon,  up in the dark.   You make the night not so dark.
    Hello Star,  big and white.   You make the night so very nice.
    Hello Wind,  strong and free.   You blow things around, and make it cool.
    Hello Rain,  pouring down.   You bring water,  and cool our ground.
    Hello Lightning,  from high above.   Your bright flashing light gives us a fright.    Hello Thunder,   roaring in the rain.   You make a boom noise, so very loud.
    Hello Dew,  drops of water.   You make the ground soft and wet.
    Hello Tree,  big and strong.   You give us shade and fruit to eat.
    Hello Bird,  flying in the sky.   You fill our days with lovely songs.
    Hello You,   reading this book.   Now you’ve met my friends,   please show me yours!`,
  },
  {
    label: "I Can Climb!",
    value: `I am a big boy now.
    I can climb up the steps.
    But I cannot climb down again.
    I can climb on a chair.
    But I cannot climb down again.
    I climb on to the chair, and then on the table!
    But I cannot climb down again.
    “Papa! Papa!” I shout.  Papa laughs. “Sonu, learn to climb down!” he says.
    I am afraid. But I do not cry.
    Slowly, I get down from the table, and down from the chair.
    At last, I have learnt to climb down too!`,
  },
  {
    label: "Joe and the Red Yellow Wellingtons",
    value: `Joe looked out of the window. It was raining.  Snozel was fast asleep in his basket.
  Come on, said Joe. Lets go for a walk in the rain.  Snozel looked out of the window.  He did not want to go out in the rain.
  Snozel pretended to be asleep. That never works thought Snozel as Joe put Snozels lead on and pulled him out of his nice warm basket.
  Snozel then pretended to go lame in the hall.  That did not work either.   Outside it was raining. Everything was wet wet wet. Soon Snozel became very wet. Snozel looked at Joe. Joe was dry.  Joe was wearing a big yellow hat, a big red coat and big yellow wellington boots.  As they walked down the street past the post box Snozel thought about his cold wet feet.... Why can't I have real yellow wellingtons thought Snozel, he started thinking about yellow wellingtons Real yellow wellingtons Stand upon there own, They astound you Dumbfound you,  They throw themselves At you, They display An array, Of tempestuous Abandon, And show out There owner, To be of Good taste, So never despair Rush out for A pair, And show The whole world, You're A swell. Half way down the street they met Sprags feet walking towards them. They could not see the rest of Sprag as he was covered by a big umbrella. Hello Sprag, said Joe Sprag lifted up the umbrella.  Hello Joe, said Sprag then pulled the umbrella down again and carried on walking up the street. Joe and Snozel arrived outside Banners cake shop.  They looked in through the window.`,
  },
];

export default function QuestionChat() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [text, setText] = useState("");
  const [chatPage, setChatPage] = useState(1);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [recordingAnswer, setRecordingAnswer] = useState(0);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [chatData, setChatData] = useState({
    bookText: startQuestions[0].value,
    chatMessages: [],
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [isQuestioningCompleted, setIsQuestioningCompleted] = useState(false);
  const [answerStartedAt, setAnswerStartedAt] = useState();

  const recorder = useRef(null); //Recorder
  const [blobURL, setBlobUrl] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [startQuestion, setStartQuestion] = useState();

  const { transcript, listening, resetTranscript, isMicrophoneAvailable } =
    useSpeechRecognition();

  const synth = window.speechSynthesis;
  const u = new SpeechSynthesisUtterance(text);
  let permission = {};

  useEffect(() => {
    setUtterance(u);
    if (text) {
      synth.speak(u);
      setIsSpeaking(true);
    }

    return () => {
      synth.cancel();
    };
  }, [text]);

  const getTextAnswer = async (recordedAnswer) => {
    setAnswerStartedAt(null);
    if (Date.now() - answerStartedAt > 60000) {
      setRecordingAnswer(1);
      return alert("answer length cannot be longer than 60 seconds");
    }
    setLoadingAnswer(true);
    try {
      setUserAnswer("");
      const data = new FormData();
      data.append("audioFile", recordedAnswer);

      const response = await axios.post(
        "https://comprehension-service-kywp6ez3tq-wl.a.run.app/speech-to-text",
        data,
        {
          headers: {
            authorization:
              "Bearer eyJ1c2VyIjogInJlYWRhYmlsaXR5LXR1dG9yIiwgInJvbGUiOiAic2VydmljZS1hY2NvdW50In0=",
          },
        }
      );

      const answer = response.data.text;
      setUserAnswer(answer);
      const newChat = chatData.chatMessages;
      newChat.push({
        role: "user",
        content: answer,
      });
      const updatedChat = {
        ...chatData,
        chatMessages: newChat,
      };
      setChatData(updatedChat);
      getQuestion(updatedChat);
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response?.data?.message ===
          "The audio file could not be processed, please try again!"
      ) {
        alert("Please record your answer once again");
        setRecordingAnswer(1);
      }
    }
    setLoadingAnswer(false);
  };

  useEffect(() => {
    recorder.current = new MicRecorder({ bitRate: 128 });
    getQuestion(chatData);
  }, [startQuestion]);

  const startRecording = async () => {
    // if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    //   return;
    // }

    try {
      permission = await navigator.permissions.query({
        name: "microphone",
      });
      // await navigator.getUserMedia(
      //   { audio: true },
      //   () => {
      //     console.log("Permission Granted");
      //     permission.state = "granted";
      //   },
      //   () => {
      //     console.log("Permission Denied");
      //     permission.state = "denied";
      //   }
      // );
    } catch (err) {
      console.log(err);
    }
    if (permission.state === "denied") {
      setRecordingAnswer(1);
      return alert("microphone permission is required");
    }

    recorder.current.start().then(() => {
      setIsRecording(true);
    });
    SpeechRecognition.startListening();
    if (permission.state === "granted") {
      setRecordingAnswer(2);
      setAnswerStartedAt(Date.now());
    }
  };

  const stopRecording = () => {
    recorder.current
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
        getTextAnswer(file);
      })
      .catch((e) => console.log("error", e));
    setRecordingAnswer(0);
    resetTranscript();
  };

  u.onend = (event) => {
    setIsSpeaking(false);
    setRecordingAnswer(1);
    setTimeout(function () {
      startRecording();
    }, 10);
  };

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsSpeaking(false);
  };

  const getQuestion = async (oldChat) => {
    setLoadingQuestion(true);
    const data = oldChat;
    const response = await axios.post(
      "https://comprehension-service-kywp6ez3tq-wl.a.run.app/questions",
      data,
      {
        headers: {
          authorization:
            "Bearer eyJ1c2VyIjogInJlYWRhYmlsaXR5LXR1dG9yIiwgInJvbGUiOiAic2VydmljZS1hY2NvdW50In0=",
        },
      }
    );

    const chats = response.data.chatMessages;
    setChatData({
      ...chatData,
      chatMessages: chats,
    });
    setLoadingQuestion(false);
    const lastQuestion = chats[chats.length - 1].content;
    if (lastQuestion.endsWith("-end-comprehension")) {
      setIsSpeaking(true);
      setIsQuestioningCompleted(true);
      setText(lastQuestion.replace("-end-comprehension", ""));
      setRecordingAnswer(0);
    } else {
      setText(chats[chats.length - 1].content);
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      interval && clearInterval(interval);
      if (!isSpeaking && isQuestioningCompleted && chatPage < 6) {
        setChatPage(chatPage + 1);
      }
    }, 3000);
  }, [chatPage, isQuestioningCompleted, isSpeaking]);

  useEffect(() => {
    if (!listening && recorder.current.activeStream) {
      stopRecording();
    }
  }, [listening]);

  useEffect(() => {
    return () => {
      setIsSpeaking(false);
    };
  }, []);

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: "url(/img/question-chat/chat-background.jpg)",
      }}
    >
      {chatPage === 1 ? (
        <>
          <div className={styles.startQuestionWrapper}>
            <Select
              defaultValue={startQuestions[0]}
              options={startQuestions}
              value={startQuestion}
              onChange={(value) => {
                setStartQuestion(value);
                handleStop();
                setChatData({
                  bookText: value.value,
                  chatMessages: [],
                });
              }}
              isSearchable={false}
            />
          </div>

          {chatData.chatMessages.length === 0 && loadingQuestion && (
            <div className="myRow">
              <Icon
                customStyle={{ width: 64, height: 64 }}
                icon={"/img/avatars/speaker-icon.png"}
                alt={"assistant"}
              />
              <Card className={styles.questionLoader}>
                <ThreeDots
                  height="auto"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </Card>
            </div>
          )}

          {chatData.chatMessages.length > 0 &&
            chatData.chatMessages.map((chat, index) => (
              <div key={index}>
                {chat.role === chat_Type.assistant && (
                  <div className="myRow">
                    <>
                      <Icon
                        customStyle={{ width: 64, height: 64 }}
                        icon={"/img/avatars/speaker-icon.png"}
                        badge={
                          index === chatData.chatMessages.length - 1 ? (
                            isSpeaking ? (
                              <GiSpeaker />
                            ) : (
                              <GiSpeakerOff />
                            )
                          ) : (
                            ""
                          )
                        }
                        onClick={(e) => {
                          if (index === chatData.chatMessages.length - 1) {
                            if (isSpeaking) {
                              handleStop();
                              setRecordingAnswer(1);
                            } else {
                              handlePlay();
                              setRecordingAnswer(0);
                            }
                          }
                        }}
                        alt={"assistant"}
                      />
                      {loadingQuestion &&
                      index === chatData.chatMessages.length - 1 ? (
                        <Card className={styles.questionLoader}>
                          <ThreeDots
                            height="auto"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                          />
                        </Card>
                      ) : (
                        <Card
                          bordered
                          style={{ width: "50%", height: "auto" }}
                          className={styles.questionLoader}
                        >
                          <p>
                            {chat.content.endsWith("-end-comprehension")
                              ? chat.content.replace("-end-comprehension", "")
                              : chat.content}
                          </p>
                        </Card>
                      )}
                    </>
                  </div>
                )}

                {chat.role === chat_Type.user && (
                  <div className="myRow" style={{ justifyContent: "flex-end" }}>
                    {loadingAnswer &&
                    index === chatData.chatMessages.length - 1 ? (
                      <Card className={styles.questionLoader}>
                        <ThreeDots
                          height="auto"
                          width="80"
                          radius="9"
                          color="#4fa94d"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                        />
                      </Card>
                    ) : (
                      <Card
                        bordered
                        style={{
                          width: "50%",
                          height: "auto",
                          borderRadius: "1rem 0px 1rem 1rem",
                          backgroundColor: "#2FC0B5",
                          color: "#fff",
                        }}
                        className={styles.questionLoader}
                      >
                        <p>{chat.content}</p>
                      </Card>
                    )}
                    <Icon
                      icon={"/img/avatars/user-icon.png"}
                      customStyle={{ width: 64, height: 64 }}
                      alt={"user"}
                    />
                  </div>
                )}

                {index === chatData.chatMessages.length - 1 ? (
                  chat.role === chat_Type.assistant && loadingAnswer ? (
                    <div
                      className="myRow"
                      style={{ justifyContent: "flex-end" }}
                    >
                      <Card className={styles.questionLoader}>
                        <ThreeDots
                          height="auto"
                          width="80"
                          radius="9"
                          color="#4fa94d"
                          ariaLabel="three-dots-loading"
                          wrapperStyle={{}}
                          wrapperClassName=""
                          visible={true}
                        />
                      </Card>
                      <Icon
                        icon={"/img/avatars/user-icon.png"}
                        customStyle={{ width: 64, height: 64 }}
                        alt={"user"}
                      />
                    </div>
                  ) : (
                    chat.role === chat_Type.user &&
                    loadingQuestion && (
                      <div className="myRow">
                        <Icon
                          customStyle={{ width: 64, height: 64 }}
                          icon={"/img/avatars/speaker-icon.png"}
                          alt={"assistant"}
                        />
                        <Card className={styles.questionLoader}>
                          <ThreeDots
                            height="auto"
                            width="80"
                            radius="9"
                            color="#4fa94d"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                          />
                        </Card>
                      </div>
                    )
                  )
                ) : (
                  ""
                )}
              </div>
            ))}

          <div style={{ flexGrow: 1 }}></div>
          {console.log(recordingAnswer)}
          {recordingAnswer === 0 ? (
            <div className={styles.micIcon}>
              <BsMic />
            </div>
          ) : recordingAnswer === 1 ? (
            <div className={styles.micIcon}>
              <BsMic
                style={{ backgroundColor: "#2fc0b5", cursor: "pointer" }}
                onClick={() => {
                  startRecording();
                  handleStop();
                }}
              />
            </div>
          ) : (
            <div
              className={`${styles.micIcon} ${styles.recordingIcon}`}
              style={{
                width: "fit-content",
                marginInline: "auto",
                cursor: "pointer",
              }}
              onClick={() => {
                stopRecording();
              }}
            >
              <Bars
                height="56"
                width="56"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                className={`${styles.micIcon} ${styles.recordingIcon}`}
              />
            </div>
          )}
        </>
      ) : chatPage === 2 ? (
        <>
          <StartWork1 />
        </>
      ) : chatPage === 3 ? (
        <>
          <StarWork2 />
        </>
      ) : chatPage === 4 ? (
        <>
          <Gift />
        </>
      ) : chatPage === 5 ? (
        <>
          <Student />
        </>
      ) : (
        <>
          <ReadMore />
        </>
      )}
    </div>
  );
}
