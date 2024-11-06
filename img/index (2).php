<?php


// interface Subscriber {
//     public function update(string $message) : void;
// }

// class User implements Subscriber {
//     private $name;
//     public function __construct(string $name) {
//         $this->name = $name;
//     }
//     public function update(string $message) : void {
//         echo "{$this->name} отримав повідомлення: $message\n";
//     }
// }

// interface NotificationSystem {
//     public function subcribe(Subscriber $subscriber) : void;
//     public function unSubscribe(Subscriber $subscriber) : void;
//     public function notifySubscribers(string $message) : void;
// }

// class Message implements NotificationSystem {
//     private $subscribers = [];
//     public function subcribe(Subscriber $subscriber) : void {
//         $this->subscribers[] = $subscriber;
//     }
//     public function unSubscribe(Subscriber $subscriber) : void {
//         $this->subscribers = array_filter($this->subscribers, function($s) use ($subscriber) {
//             return $s !== $subscriber;
//         });
//     }
//     public function notifySubscribers(string $message) : void {
//         foreach ($this->subscribers as $subscriber) {
//             $subscriber->update($message);
//         }
//     }
// }

// $messages = new Message();
// $user1 = new User("Олександр");
// $user2 = new User("Марія");
// $messages->subcribe($user1);
// $messages->subcribe($user2);
// $messages->notifySubscribers("helo");
// $messages->unSubscribe($user1);
// $messages->notifySubscribers("hello");




class AudioPlayer {
    public function downloadAudio(string $fileName) :void {
        echo "завантаження: $fileName\n";
    }
    public function playAudio() :void {
        echo "включено";
    }
}
class VideoPlayer {
    public function downloadVideo(string $fileName) :void {
        echo "завантаження: $fileName\n";
    }
    public function playVideo() :void {
        echo "включено відео";
    }
}
class SubtitleLoader {
    public function downloadSubTitles(string $fileName) :void {
        echo "завантаження: $fileName\n";
    }
}
class MediaFasad {
    private $audioPlayer;
    private $videoPlayer;
    private $subtitleLoader;
    public function __construct() {
        $this->audioPlayer = new AudioPlayer();
        $this->videoPlayer = new VideoPlayer();
        $this->subtitleLoader = new SubtitleLoader();
    }

    public function playMedia(string $fileName) :void {
        $this->audioPlayer->downloadAudio($fileName);
        $this->videoPlayer->downloadVideo($fileName);
        $this->subtitleLoader->downloadSubTitles($fileName);
        $this->audioPlayer->playAudio();
    }
}

$mediaFasad = new MediaFasad();
$mediaFasad->playMedia('');


?> 