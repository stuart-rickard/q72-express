let messageOptions = [
  "Hold your horses, pal! I'm swamped right now. Try again in a jiffy!",
  "Cool your jets, I'm up to my eyeballs here. Give it a minute!",
  "Hey, take a breather! I'm juggling cats over here. Check back soon!",
  "Hold the phone, I'm in the weeds. Try me again in a shake!",
  "Take a powder, buddy, I'm swamped here, gimme a moment!",
  "Sit tight, I'm snowed under. Swing back in a spell!",
  "Hang fire, I'm all tied up. Give it a rest and come back later!",
  "Don't bust my chops, I'm knee-deep. Come back in two shakes of a lamb's tail!",
  "I'm drowning in work. Hit me up in a bit!",
  "Give it a rest, I'm up to my neck. Catch me later!",
  "Cool your heels, I'm swamped. Try again when the dust settles!",
  "Pipe down, I'm knee-deep in it. Swing by later!",
  "Take a powder, I'm buried here. Check back in a jiffy!",
  "Give me a break, I'm up to my gills. Try again in a minute!",
  "Hold the fort, I'm up to my ears. Give me a few!",
  "I'm bogged down at the moment. Check back soon!",
  "Hang tight, I'm all wrapped up. Give it another go soon!",
  "Hold your horses, I'm neck-deep. Try again when the coast is clear!",
  "I'm swamped here. Give it a rest and check back!",
  "Keep your shirt on, I'm snowed under. Try again in a bit!",
  "Simmer down, I'm up to my eyeballs. Give me a few seconds and try again!",
  "Simmer down, sport, I'm juggling a million things -- try again soon!",
  "Pipe down, ace, I'm busy as a one-armed paperhanger! I need a moment!",
  "Hold the phone, chief, I'm snowed under with work! Try again in a bit!",
];

function getBusyMessage() {
  return messageOptions[Math.floor(Math.random() * messageOptions.length)];
}

export { getBusyMessage };
