$r = Invoke-WebRequest -Uri 'https://favenimatriculas.com.br/pos-aba/' -UseBasicParsing -TimeoutSec 30
$c = $r.Content
[IO.File]::WriteAllText('C:\Users\joao_\Downloads\landing page\_live.html', $c, (New-Object System.Text.UTF8Encoding($false)))
Write-Output ('tamanho: ' + $c.Length)
Write-Output ('wp-content/themes: ' + ([regex]::Matches($c, 'wp-content/themes')).Count)
Write-Output ('elementor: ' + ([regex]::Matches($c, 'elementor')).Count)
Write-Output ('wp-block: ' + ([regex]::Matches($c, 'wp-block')).Count)
Write-Output ('admin-bar: ' + ([regex]::Matches($c, 'admin-bar')).Count)
Write-Output ('shortcode cru: ' + ([regex]::Matches($c, 'elementor-template id')).Count)
$i = $c.IndexOf('elementor-template id')
if ($i -gt 0) { Write-Output ('contexto: ...' + $c.Substring([Math]::Max(0, $i - 200), 300).Replace("`n", ' ') + '...') }
