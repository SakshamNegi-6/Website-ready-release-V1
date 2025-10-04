// This endpoint clears leaderboard / high score stored in localStorage-like persistence.
// On Vercel, you'd usually use a DB or KV, but here we simulate.

let leaderboard = [];
let highScore = 0;

export default function handler(req,res){
  if(req.method!=="POST"){
    return res.status(405).json({error:"Method not allowed"});
  }
  const {password,type} = req.body;
  if(password!==process.env.ADMIN_PASSWORD){
    return res.status(401).json({error:"Unauthorized"});
  }
  switch(type){
    case "leaderboard":
      leaderboard=[];
      return res.status(200).json({success:true,message:"Leaderboard reset!"});
    case "new-player":
      // just clears session info; here we simulate
      return res.status(200).json({success:true,message:"New player session reset!"});
    case "master":
      leaderboard=[];highScore=0;
      return res.status(200).json({success:true,message:"Master reset complete!"});
    default:
      return res.status(400).json({error:"Invalid reset type"});
  }
}
