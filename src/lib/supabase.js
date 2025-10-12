import { createClient } from "@supabase/supabase-js";

const Supabase_Url= import.meta.env.VITE_SUPABASE_URL;
const Supabase_Anon = import.meta.env.VITE_SUPABASE_ANON;

const supabase = createClient(Supabase_Url ,Supabase_Anon ,{
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
export default supabase;