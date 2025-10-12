import { createClient } from "@supabase/supabase-js";

const Supabase_url = import.meta.env.VITE_SUPABASE_URL;
const Supabase_anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(Supabase_url,Supabase_anon,{
    auth:{
        persistSession:true,
        autoRefreshToken:true
    },
     realtime:{
        params:{
            eventsPerSecond:10
        }
     }
})

export default supabase