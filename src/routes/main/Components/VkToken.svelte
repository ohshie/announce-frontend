<script>
	import { vkToken, tokenReady } from "./Stores/stores.ts";

    let readonly = false;
    let disabled = false;

    let buttonMessage = 'Проверить доступ к VK';

    async function CheckVKToken()
    {
        let encodedToken = encodeURIComponent($vkToken);

        const response = await fetch("http://localhost:5000/Announce/CheckVkToken/", {
            method: "POST",
            mode: "cors",
            body: encodedToken,
        })

        if (response.ok)
        {
            disabled = true;
            readonly = true;

            tokenReady.set(true);

            buttonMessage = '👍'
        }
    }
</script>

<div class="flex gap-2">
    <input {readonly} class="border-2 border-black rounded-none
    focus:outline-none bg-slate-200 focus:bg-slate-300 focus:rounded-none"
    bind:value={$vkToken}>

    <button {disabled} on:click={CheckVKToken} class="p-2
    border-2 border-black
    bg-green-600
    font-bold 
    enabled:hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)] 
    text-xs sm:text-sm
    transition duration-100">{buttonMessage}</button>
</div>