
exports.ask = {
  command: ['ask','?'],
  title: 'Ask a question',
  desc: 'Ask a question and receive an answer as soon as its ready in the same channel. This will cost you some favor.',
  example: ['? What should i ask?']
};

exports.answer = {
  command: ['answer','!'],
  title: 'Answer questions',
  desc: 'Answer a question to gain 1 favor.',
  example: ['!']
};

exports.myprofile = {
  command: ['myprofile','mp'],
  title: 'My Profile',
  desc: 'Show your status and favor.',
  example: ['mp']
};

exports.myquestions = {
  command: ['myquestions','mq'],
  title: 'My Questions',
  desc: 'Your own past and active questions.',
  example: ['mq']
};

exports.latest = {
  command: ['latest [page]','l [page]'],
  title: 'Latest Questions',
  desc: 'Show the latest questions that were asked globally. Add a number to page through.',
  example: ['l','l 3']
};

exports.tip = {
  command: ['tip <answerId> <amount>'],
  title: 'Tip',
  desc: 'Tip some favor to the author of an answer if you liked it.',
  example: ['tip 0000 0.5']
};

exports.show = {
  command: ['show <questionId>'],
  title: 'Show questions',
  desc: 'Shows a question and it\'s answers with the given id.',
  example: ['show 0000']
};

exports.report = {
  command: ['report question <questionId> unrelated|atos','report answer <answerId> unrelated|atos'],
  title: 'Report a user\'s question or answer.',
  desc: 'Report a user for inappropriate, against-TOS (f.e. copyrighted, sexual or racist content) or unrelated content. The reason and can either be "atos" (against terms of service) or "unrelated" if the answer has nothing to do with the question.',
  example: ['report question 0000 atos']
};

exports.help = {
  command: ['help','h'],
  title: 'Help',
  desc: 'Get help and few commands.',
  example: ['help']
};

/*
exports.voting = {
  title: 'Voting and inviting',
  desc: 'Upvote or refer members.',
  subdesc: 'Upvote or invite another user for a bunch of XP. You can do this once every now and then (cooldown depends on the server settings).',
  subcommands: [
    {title: 'Inviter',command: '<prefix>member { @user | userName#tag | userId } set inviter',desc:'Set someone else as your inviter. Both of you will receive one invite. You can set your inviter only once.',example: '<prefix>m username#0001 set inviter'},
    {title: 'Upvote',command: '<prefix>member { @user | userName#tag | userId } up',desc:'Upvote someone (and grant some XP to the user)',example: '<prefix>m @user up. ' + '<prefix>m username#0001 up'},
  ]
};

*/
