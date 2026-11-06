let recognition: any = null;

export async function startSpeechRecognition(onResult: (text: string) => void) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported on this browser. Try Safari on iOS.");
    throw new Error("Not supported");
  }

  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'ar-SA'; // Sets the listening language to Arabic

  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    if (interimTranscript) {
      onResult(interimTranscript);
    }
  };

  recognition.start();
}

export function stopSpeechRecognition() {
  if (recognition) {
    recognition.stop();
  }
}
