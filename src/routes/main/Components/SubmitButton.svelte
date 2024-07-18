<script>
    import { tokenReady, rowsReady, vkToken, tableRows } from "./Stores/stores";

    rowsReady.subscribe;

    $: buttonText = $tokenReady ? "Создать анонсы" : 'Проверь доступ в вк!' ;
    $: disabled = !$rowsReady && buttonText != "Создать анонсы";

    async function submitData()
    {
        let announces = $tableRows
        let encodedToken = encodeURIComponent($vkToken);
        let dataToSend = JSON.stringify({ announces, encodedToken });
        console.log("Sending data:", dataToSend);

        const response = await fetch("http://localhost:5000/Announce/SubmitAnnounces/", {
            method: "POST",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({announces, encodedToken})
        });

        if(response.ok){
            console.log("ok")
        }
    }
</script>

<button on:click={submitData}
{disabled} 
class="disabled:bg-gray-900 bg-green-500 
p-6
border-4 border-black
font-mono font-extrabold
text-2xl text-black disabled:text-white
enabled:hover:shadow-[5px_5px_0px_0px_rgba(109,40,217)]
transition duration-100">
    {buttonText}
</button>